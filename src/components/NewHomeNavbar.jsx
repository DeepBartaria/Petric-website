import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiGrid, FiChevronRight, FiMenu, FiMapPin, FiChevronDown, FiX, FiTrendingUp, FiArrowLeft, FiShoppingCart, FiPhone } from 'react-icons/fi';
import { BsArrowRepeat } from 'react-icons/bs';
import logo from '../assets/logo.png';
import LogoBar from './LogoBar';
import DeliveryLocationModal from './DeliveryLocationModal';
import ProfileSidebar from './ProfileSidebar';
import OrdersSidebar from './OrdersSidebar';
import { getHomePageProductsApi } from '../api/homeApi';
import { get } from '../helper/api';
import { post } from '../helper/api';
import useCart from '../hooks/useCart';
import { logActivity } from '../helper/analytics';

// Popular/trending searches shown when input is focused but empty
const TRENDING_SEARCHES = [
  'Pedigree dog food',
  'Royal Canin',
  'Cat wet food',
  'Drools chicken',
  'Dog treats',
  'Puppy food',
];

// Levenshtein distance for typo tolerance (last-resort fallback)
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export default function NewHomeNavbar() {
  const placeholders = ['Type "pedigree"', 'Type "milk"', 'Type "nutrition"'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  // Prebuilt search index: array of { product, nameText, fullText, tokens, nameTokens }
  const searchIndexRef = useRef([]);
  const categoryScrollRef = useRef(null);
  const [categoryScrollPos, setCategoryScrollPos] = useState(0);
  const [navCategories, setNavCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categorySubcategories, setCategorySubcategories] = useState({});
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();

  const { cartItems } = useCart();
  const itemCount = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const prevCountRef = useRef(itemCount);
  const [countPop, setCountPop] = useState(false);

  useEffect(() => {
    if (itemCount !== prevCountRef.current && itemCount > 0) {
      prevCountRef.current = itemCount;
      setCountPop(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setCountPop(true))
      );
    } else {
      prevCountRef.current = itemCount;
    }
  }, [itemCount]);

  const showDropdown = isFocused && (inputValue.trim().length > 0 ? searchResults.length > 0 : true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        // Don't auto-close the mobile fullscreen overlay on stray clicks
        if (isMobileSearchOpen) return;
        setIsFocused(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSearchOpen]);

  // Lock body scroll when the mobile search overlay is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isMobileSearchOpen]);

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e) => {
    const items = inputValue.trim() ? searchResults : [];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        navigateToProduct(items[highlightedIndex]);
      } else if (inputValue.trim()) {
        navigateToSearch(inputValue.trim());
      }
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setIsFocused(false);
    setHighlightedIndex(-1);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);

    if (value.trim()) {
      logActivity(
        `User search ${value} text`,
        'WebProductSearch'
      );
    }
  };

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
    setIsFocused(true);
    // Focus the mobile input after the overlay mounts
    setTimeout(() => mobileInputRef.current?.focus(), 50);
  };

  const navigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
    setInputValue("");
    setSearchResults([]);
    setIsFocused(false);
    setHighlightedIndex(-1);
    setIsMobileSearchOpen(false);
  };

  const navigateToSearch = (query) => {
    navigate(`/all-categories?search=${encodeURIComponent(query)}`);
    setInputValue("");
    setSearchResults([]);
    setIsFocused(false);
    setHighlightedIndex(-1);
    setIsMobileSearchOpen(false);
  };

  const fetchNavCategories = async () => {
    try {
      const res = await get('product/category');
      if (res?.categories) setNavCategories(res.categories);
    } catch (error) {
      console.error("Error fetching nav categories:", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (categorySubcategories[categoryId]) return;
    try {
      const res = await get(`product/subCategory?categoryId=${categoryId}`);
      if (res?.subCategories) {
        setCategorySubcategories(prev => ({ ...prev, [categoryId]: res.subCategories }));
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryHover = (category) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredCategory(category);
    fetchSubcategories(category._id);
  };

  const handleCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 200);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 200);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('petric_user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) {}
    }

    fetchNavCategories();

    const fetchSearchData = async () => {
      try {
        // Fetch all pages in parallel — get page 1 first to know total
        const firstPageRes = await post('product/list/all/forUser', {
          page: 1,
          limit: 100,
          sort: { createdAt: 1 }
        });

        let allProds = [];

        if (firstPageRes?.products) {
          allProds.push(...firstPageRes.products);

          const totalPages = firstPageRes.totalPages || 1;

          // Fetch remaining pages in parallel
          if (totalPages > 1) {
            const pagePromises = [];
            for (let page = 2; page <= Math.min(totalPages, 50); page++) {
              pagePromises.push(
                post('product/list/all/forUser', {
                  page,
                  limit: 100,
                  sort: { createdAt: 1 }
                })
              );
            }
            const restPages = await Promise.all(pagePromises);
            for (const res of restPages) {
              if (res?.products) allProds.push(...res.products);
            }
          }
        }

        console.log('[Search] Total products fetched:', allProds.length);

        // Also pull homepage products
        let homeProds = [];
        const homeProductsRes = await getHomePageProductsApi();
        if (homeProductsRes?.type === "success") {
          const sections = homeProductsRes.homePageProductsData || [];
          for (const section of sections) {
            homeProds.push(...(section.products || section.data || []));
          }
        }

        // Merge and deduplicate
        const merged = [...allProds, ...homeProds];
        const unique = Array.from(new Map(merged.map(p => [p._id, p])).values())
          .filter(p => p && typeof p.name === 'string' && p.name.trim().length > 0);

        console.log('[Search] Index built:', unique.length, 'products');

        setAllProducts(unique);

        // Build search index
        searchIndexRef.current = unique.map(p => {
          const nameText = p.name.toLowerCase();
          const nameTokens = nameText.split(/[\s()\-,./]+/).filter(t => t.length > 1);
          return { product: p, nameText, nameTokens };
        });

        console.log('[Search] Sample names:', unique.slice(0, 5).map(p => p.name));

      } catch (error) {
        console.error('[Search] fetchSearchData error:', error);
      }
    };

    fetchSearchData();

    const storedDeliveryTime = localStorage.getItem('petric_delivery_time');
    if (storedDeliveryTime) setDeliveryTime(storedDeliveryTime);

    const handleDeliveryTimeUpdate = (e) => setDeliveryTime(e.detail);
    window.addEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);

    const handleOpenDeliveryLocation = () => {
      window.dispatchEvent(new CustomEvent('closeCart'));
      setIsLocationModalOpen(true);
    };
    window.addEventListener('openDeliveryLocation', handleOpenDeliveryLocation);

    const handlePetricLoginSuccess = (e) => {
      if (e.detail?.user) {
        setUser(e.detail.user);
        return;
      }

      const storedUser = localStorage.getItem('petric_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {}
      }
    };

    window.addEventListener('petricLoginSuccess', handlePetricLoginSuccess);

    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
      window.removeEventListener('openDeliveryLocation', handleOpenDeliveryLocation);
      window.removeEventListener('petricLoginSuccess', handlePetricLoginSuccess);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // ─── Search Engine ────────────────────────────────────────────────────────────
  
  useEffect(() => {
    const raw = inputValue.trim();
    console.log('[Search] Query:', raw, '| Index size:', searchIndexRef.current.length);

    if (!raw || searchIndexRef.current.length === 0) {
      setSearchResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const q = raw.toLowerCase();
    const queryTokens = q.split(/[\s()\-,./]+/).filter(t => t.length > 0);

    const scored = [];

    for (const entry of searchIndexRef.current) {
      const { product, nameText, nameTokens } = entry;
      let score = 0;

      for (const qt of queryTokens) {
        // Substring match in full name
        if (nameText.includes(qt)) {
          score += 60;
          if (nameText.startsWith(qt)) score += 30;
        }

        // ✅ PREFIX match on each individual word token
        for (const token of nameTokens) {
          if (token.startsWith(qt)) {
            score += 50;
            if (nameTokens[0] === token) score += 15;
            break;
          }
        }
      }

      if (score > 0) scored.push({ product, score });
    }

    scored.sort((a, b) => b.score - a.score || a.product.name.length - b.product.name.length);
    const results = scored.map(s => s.product).slice(0, 8);
    console.log('[Search] Results:', results.map(p => p.name));
    setSearchResults(results);
    setHighlightedIndex(-1);
  }, [inputValue]);

  // Highlight matching text in product name
  const highlightMatch = (text, query) => {
    if (!query.trim() || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-[#FFD000]/60 text-black rounded-sm px-0.5 not-italic">{part}</mark>
        : part
    );
  };

  return (
    <>
      <div className="sticky top-0 z-[90] w-full flex flex-col font-sans bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.18)] ring-2 ring-black/10">
      {/* Top Navbar */}
      <div className="bg-white flex flex-col md:flex-row md:items-center justify-between w-full">
        {/* Logo */}
        <LogoBar />

        {/* Search & Hamburger */}
        <div className="flex w-full md:w-auto flex-1 items-center gap-3 px-4 py-1.5 md:py-0 md:px-4 lg:px-8 border-t border-gray-100 md:border-0 order-last md:order-none">
          {/* Search */}
          <div className="flex-1 max-w-full xl:max-w-5xl relative group" ref={searchContainerRef}>
          <div className={`relative flex items-center w-full h-9 md:h-12 rounded-full border bg-white overflow-hidden transition-colors duration-200 ${isFocused ? 'border-black shadow-md' : 'border-gray-400 group-hover:border-black'}`}>
            {/* Mobile-only transparent tap overlay — opens fullscreen search */}
            <button
              type="button"
              aria-label="Open search"
              className="absolute inset-0 z-30 md:hidden"
              onClick={openMobileSearch}
            />
            <div className="pl-3 md:pl-4 pr-2 md:pr-3 text-[#FFD000]">
              <FiSearch className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110" strokeWidth={3} />
            </div>

            <div className="flex-1 h-full relative pr-2 md:pr-[130px]">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                className="absolute inset-0 w-full h-full outline-none px-1 text-xs md:text-sm text-gray-700 bg-transparent z-10"
                placeholder=""
                value={inputValue}
                onChange={handleSearchInputChange}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
              />
              {/* Animated placeholder */}
              {!isFocused && !inputValue && (
                <div className="absolute inset-0 pointer-events-none flex flex-col overflow-hidden">
                  <div
                    className="flex flex-col transition-transform duration-500 ease-in-out w-full h-full"
                    style={{ transform: `translateY(-${currentIndex * 100}%)` }}
                  >
                    {placeholders.map((text, i) => (
                      <div key={i} className="h-full w-full shrink-0 flex items-center px-1 text-gray-400 text-xs md:text-sm whitespace-nowrap">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear button */}
            {inputValue && (
              <button
                onClick={() => { setInputValue(""); setSearchResults([]); inputRef.current?.focus(); }}
                className="mr-2 text-gray-400 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100 z-10 hidden md:flex"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}

            <div className={`absolute right-4 top-1/2 -translate-y-1/2 hidden md:block border-b border-black hover:border-[#FFD000] transition-all duration-300 z-20 ${inputValue ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openDeliveryLocation'))}
                className="text-xs text-black font-medium whitespace-nowrap hover:text-gray-700 transition-colors duration-200"
              >
                <FiMapPin className="inline-block h-3 w-3 mr-1" />
                {deliveryTime ? `Delivery in ${deliveryTime} mins` : 'Check Delivery Time'}
              </button>
            </div>
          </div>

          {/* Search Dropdown (desktop only — mobile uses the fullscreen overlay) */}
          {showDropdown && (
            <div className="hidden md:block absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl mt-2 z-50 border border-gray-100 overflow-hidden">

              {/* Trending / empty state */}
              {!inputValue.trim() && (
                <div className="p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2 flex items-center gap-1.5">
                    <FiTrendingUp className="h-3 w-3" /> Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {TRENDING_SEARCHES.map((term, i) => (
                      <button
                        key={i}
                        onMouseDown={(e) => { e.preventDefault(); navigateToSearch(term); }}
                        className="bg-gray-50 hover:bg-[#FFF9CC] border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product suggestions */}
              {inputValue.trim() && searchResults.length > 0 && (
                <div className="max-h-[420px] overflow-y-auto">
                  {/* "Search for X" row */}
                  <button
                    onMouseDown={(e) => { e.preventDefault(); navigateToSearch(inputValue.trim()); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFD000]/20 flex items-center justify-center shrink-0">
                      <FiSearch className="h-4 w-4 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-black">Search for "</span>
                      <span className="text-sm font-bold text-[#E65A00]">{inputValue.trim()}</span>
                      <span className="text-sm font-semibold text-black">"</span>
                    </div>
                    <FiChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-black transition-colors" />
                  </button>

                  {/* Product cards */}
                  {searchResults.map((product, idx) => {
                    const variant = product.variants?.[0];
                    const price = variant?.discountedPrice;
                    const originalPrice = variant?.originalPrice;
                    const discount = price && originalPrice && originalPrice > price
                      ? Math.round(((originalPrice - price) / originalPrice) * 100)
                      : null;
                    const isHighlighted = idx === highlightedIndex;

                    return (
                      <div
                        key={product._id}
                        onMouseDown={(e) => { e.preventDefault(); navigateToProduct(product); }}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 last:border-b-0 ${isHighlighted ? 'bg-[#FFFBEA]' : 'hover:bg-gray-50'}`}
                      >
                        {/* Product image */}
                        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center p-1 shrink-0 border border-gray-100">
                          <img
                            src={product.productImage}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {highlightMatch(product.name, inputValue.trim())}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {product.brand?.name || ''}
                            
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col items-end shrink-0">
                          {price ? (
                            <>
                              <span className="text-sm font-bold text-black">₹{price}</span>
                              {discount && (
                                <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 px-1.5 py-0.5 rounded-full mt-0.5">
                                  {discount}% off
                                </span>
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No results */}
              {inputValue.trim() && searchResults.length === 0 && (
                <div className="py-8 text-center">
                  <div className="text-3xl mb-2">🐾</div>
                  <p className="text-sm font-semibold text-gray-600">No products found for "{inputValue}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try a different keyword</p>
                </div>
              )}
            </div>
          )}

          {/* ─── Mobile Fullscreen Search Overlay ───────────────────────────── */}
          {isMobileSearchOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col">
              {/* Header: back button + input */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={closeMobileSearch}
                  className="p-2 -ml-1 text-gray-700 active:bg-gray-100 rounded-full"
                  aria-label="Close search"
                >
                  <FiArrowLeft className="h-5 w-5" strokeWidth={2.5} />
                </button>
                <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full pl-3 pr-2 h-10 border border-gray-200 focus-within:border-black focus-within:bg-white transition-colors">
                  <FiSearch className="h-4 w-4 text-[#FFD000] shrink-0" strokeWidth={3} />
                  <input
                    ref={mobileInputRef}
                    type="text"
                    autoComplete="off"
                    placeholder="Search for pet food, treats, toys..."
                    value={inputValue}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => { setInputValue(""); setSearchResults([]); mobileInputRef.current?.focus(); }}
                      className="text-gray-400 p-1.5 rounded-full active:bg-gray-200"
                      aria-label="Clear search"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Trending — shown when empty */}
                {!inputValue.trim() && (
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <FiTrendingUp className="h-3 w-3" /> Trending Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((term, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => navigateToSearch(term)}
                          className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-full active:bg-[#FFF9CC] transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {inputValue.trim() && searchResults.length > 0 && (
                  <div>
                    {/* "Search for X" row */}
                    <button
                      type="button"
                      onClick={() => navigateToSearch(inputValue.trim())}
                      className="w-full flex items-center gap-2.5 px-3 py-3 border-b border-gray-100 active:bg-gray-50"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FFD000]/20 flex items-center justify-center shrink-0">
                        <FiSearch className="h-4 w-4 text-black" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-[11px] font-semibold text-black">Search for "</span>
                        <span className="text-[11px] font-bold text-[#E65A00] break-words">{inputValue.trim()}</span>
                        <span className="text-[11px] font-semibold text-black">"</span>
                      </div>
                      <FiChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                    </button>

                    {searchResults.map((product) => {
                      const variant = product.variants?.[0];
                      const price = variant?.discountedPrice;
                      const originalPrice = variant?.originalPrice;
                      const discount = price && originalPrice && originalPrice > price
                        ? Math.round(((originalPrice - price) / originalPrice) * 100)
                        : null;

                      return (
                        <div
                          key={product._id}
                          onClick={() => navigateToProduct(product)}
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer border-b border-gray-50 active:bg-gray-100"
                        >
                          {/* Smaller image */}
                          <div className="w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center p-1 shrink-0 border border-gray-100">
                            <img
                              src={product.productImage}
                              alt={product.name}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          </div>

                          {/* Info — takes most space, allows 2 lines */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-gray-900 line-clamp-2 leading-tight">
                              {highlightMatch(product.name, inputValue.trim())}
                            </p>
                            {product.brand?.name && (
                              <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                                {product.brand.name}
                              </p>
                            )}
                          </div>

                          {/* Compact price */}
                          <div className="flex flex-col items-end shrink-0 max-w-[64px]">
                            {price ? (
                              <>
                                <span className="text-[11px] font-bold text-black whitespace-nowrap">₹{price}</span>
                                {discount && (
                                  <span className="text-[9px] font-bold text-[#FF5757] bg-red-50 px-1 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                                    {discount}% off
                                  </span>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* No results */}
                {inputValue.trim() && searchResults.length === 0 && (
                  <div className="py-16 text-center">
                    <div className="text-4xl mb-3">🐾</div>
                    <p className="text-sm font-semibold text-gray-600 px-4">No products found for "{inputValue}"</p>
                    <p className="text-xs text-gray-400 mt-1">Try a different keyword</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hamburger and Cart (Mobile) */}
        <div className="lg:hidden flex items-center gap-3 shrink-0 relative">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`text-black p-1 transition-transform duration-300 active:scale-95 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
            {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
          <button 
            data-cart-button=""
            onClick={() => window.dispatchEvent(new CustomEvent('openCart'))} 
            className="text-black p-1 transition-transform duration-200 hover:scale-110 active:scale-95 relative"
          >
            <FiShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#FFD000] text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm${
                  countPop ? ' animate-count-pop' : ''
                }`}
                onAnimationEnd={() => setCountPop(false)}
              >
                {itemCount}
              </span>
            )}
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-10 right-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col py-2 z-50">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.open('https://petric.in/download/', '_blank');

                  logActivity(
                    'User Click Download App button',
                    'Web_DownloadApp'
                  );
                }}
                className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-gray-50 flex items-center gap-2"
              >
                <span className="bg-[#FFD000] text-black px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">App</span> Download App
              </button>
              <Link
                to="/reorder"
                onClick={() => {
                  setIsMobileMenuOpen(false);

                  logActivity(
                    'User Click Re-order',
                    'Web_Reorder'
                  );
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2"
              >
                <BsArrowRepeat className="h-4 w-4" /> Reorder
              </Link>
              <Link to="/contactus" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2">
                <FiPhone className="h-4 w-4" /> Contact Us
              </Link>
              {!user && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('openCart', { detail: { step: 'mobile' } }));
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2"
                >
                  <FiUser className="h-4 w-4" /> Account
                </button>
              )}
              {user && (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProfileOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                  >
                    Your Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsOrdersOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                  >
                    Your Orders
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/saved-addresses');
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                  >
                    Saved Address
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem('petric_user');
                      localStorage.removeItem('petric_token');
                      setUser(null);
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 md:gap-8 flex-shrink-0 px-4 md:px-8 md:py-3">

          <button
            onClick={() => {
              window.open('https://petric.in/download/', '_blank');

              logActivity(
                'User Click Download App button',
                'Web_DownloadApp'
              );
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-sm transform hover:scale-105"
          >
            Download App
          </button>
          <Link
            to="/reorder"
            onClick={() => logActivity('User Click Re-order', 'Web_Reorder')}
            className="group flex flex-row items-center gap-1.5 text-gray-800 hover:text-black transition-all duration-300 hover:scale-105"
          >
            <BsArrowRepeat className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="text-sm font-medium">Reorder</span>
          </Link>
          <div className="relative group flex items-center h-full">
            <button 
              onClick={() => {
                if (!user) {
                  window.dispatchEvent(
                    new CustomEvent('openCart', {
                      detail: { step: 'mobile', mode: 'loginOnly' },
                    })
                  );
                }
              }}
              className="flex flex-row items-center gap-1.5 text-gray-800 hover:text-black border border-gray-400 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-black hover:shadow-sm bg-white"
            >
              <FiUser className="h-5 w-5" />
              <span className="text-sm font-medium">{user ? user.mobileNo : 'Account'}</span>
            </button>
            {user && (
              <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={() => setIsOrdersOpen(true)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Your Orders
                  </button>
                  <button
                    onClick={() => navigate('/saved-addresses')}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Saved Address
                  </button>
                  <button
                    onClick={() => navigate('/about/#contact')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('petric_user');
                      localStorage.removeItem('petric_token');
                      setUser(null);
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium transition-colors border-t border-gray-50 mt-1 pt-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Categories Sub-navbar */}
      <div className="category-strip bg-[#FFD000] px-3 py-2.5 md:py-3.5 md:px-8 relative z-10 border-t border-black/10">

        {/* Mobile — same layout as desktop */}
        <div className="md:hidden flex items-center relative">
          {/* Pinned "All Categories" */}
          <div className="shrink-0 z-10">
            <Link
              to="/all-categories"
              onClick={() => window.dispatchEvent(new CustomEvent('resetCategories'))}
              className="relative overflow-hidden group px-3 py-1.5 rounded-md text-black text-xs font-semibold whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] flex isolate"
            >
              <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
              All Categories
            </Link>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-black/20 mx-1 shrink-0" />

          {/* Scrollable mobile categories */}
          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden px-1">
              {navCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  state={{ categoryName: category.name }}
                  className="relative overflow-hidden group px-3 py-1.5 rounded-md text-black text-xs font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] flex items-center isolate shrink-0"
                >
                  <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2 relative">
          {/* Pinned "All Categories" — fixed width so it never shifts */}
          <div className="shrink-0 z-10">
            <Link
              to="/all-categories"
              onClick={() => window.dispatchEvent(new CustomEvent('resetCategories'))}
              className="relative overflow-hidden group px-4 py-1.5 rounded-md text-black text-base font-semibold whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] flex isolate"
            >
              <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
              All Categories
            </Link>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-black/20 shrink-0" />

          {/* Back button — always reserves space, invisible when not needed */}
          <button
            onClick={() => categoryScrollRef.current?.scrollBy({ left: -160, behavior: 'smooth' })}
            className={`shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-7 w-7 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
              categoryScrollPos > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <FiChevronRight className="h-4 w-4 rotate-180 text-[#FFD000]" strokeWidth={3} />
          </button>

          {/* Scrollable categories — no fade gradient */}
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={categoryScrollRef}
              onScroll={(e) => setCategoryScrollPos(e.target.scrollLeft)}
              className="flex items-center gap-1 overflow-x-hidden [&::-webkit-scrollbar]:hidden px-1"
            >
              {navCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative shrink-0"
                  onMouseEnter={() => handleCategoryHover(category)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <Link
                    to={`/category/${category._id}`}
                    state={{ categoryName: category.name }}
                    className="relative overflow-hidden group px-4 py-1.5 rounded-md text-black text-base font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] flex items-center isolate"
                  >
                    <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
                    {category.name}
                  </Link>

                  {hoveredCategory?._id === category._id && categorySubcategories[category._id]?.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 min-w-[200px] py-2 z-50"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {categorySubcategories[category._id].map((sub) => (
                        <Link
                          key={sub._id}
                          to={`/category/${category._id}?subCategory=${sub._id}`}
                          state={{ categoryName: category.name, subCategoryName: sub.name }}
                          className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#FFF9CC] hover:text-black font-medium transition-colors"
                          onClick={() => setHoveredCategory(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="shrink-0 w-4" />
            </div>
          </div>

          {/* Forward scroll button */}
          <button
            onClick={() => categoryScrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' })}
            className="shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-7 w-7 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <FiChevronRight className="h-4 w-4 text-[#FFD000]" strokeWidth={3} />
          </button>
        </div>

      </div>



      </div>

      <DeliveryLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <OrdersSidebar
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </>
  );
}