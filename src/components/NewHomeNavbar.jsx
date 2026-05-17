import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiGrid, FiChevronRight, FiMenu, FiMapPin, FiChevronDown, FiX, FiTrendingUp } from 'react-icons/fi';
import { BsArrowRepeat } from 'react-icons/bs';
import logo from '../assets/logo.png';
import DeliveryLocationModal from './DeliveryLocationModal';
import Fuse from "fuse.js";
import { getHomePageProductsApi, getAllProductsApi } from '../api/homeApi';
import { get } from '../helper/api';

// Popular/trending searches shown when input is focused but empty
const TRENDING_SEARCHES = [
  'Pedigree dog food',
  'Royal Canin',
  'Cat wet food',
  'Drools chicken',
  'Dog treats',
  'Puppy food',
];

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
  const [fuseInstance, setFuseInstance] = useState(null);

  const [navCategories, setNavCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categorySubcategories, setCategorySubcategories] = useState({});
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();

  const showDropdown = isFocused && (inputValue.trim().length > 0 ? searchResults.length > 0 : true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsFocused(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        // Navigate to highlighted product
        navigateToProduct(items[highlightedIndex]);
      } else if (inputValue.trim()) {
        // Search results page
        navigateToSearch(inputValue.trim());
      }
    }
  };

  const navigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
    setInputValue("");
    setSearchResults([]);
    setIsFocused(false);
    setHighlightedIndex(-1);
  };

  const navigateToSearch = (query) => {
    navigate(`/all-categories?search=${encodeURIComponent(query)}`);
    setInputValue("");
    setSearchResults([]);
    setIsFocused(false);
    setHighlightedIndex(-1);
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
        const [homeProductsRes, allProductsRes] = await Promise.all([
          getHomePageProductsApi(),
          getAllProductsApi()
        ]);
        let mergedProducts = [];
        if (homeProductsRes?.type === "success") {
          const homeProducts = homeProductsRes.homePageProductsData?.flatMap(s => s.products || []) || [];
          mergedProducts.push(...homeProducts);
        }
        if (allProductsRes?.products) mergedProducts.push(...allProductsRes.products);

        const unique = Array.from(new Map(mergedProducts.map(p => [p._id, p])).values());
        setAllProducts(unique);

        // Build Fuse index once
        const fuse = new Fuse(unique, {
          keys: [
            { name: 'name', weight: 0.5 },
            { name: 'brand.name', weight: 0.2 },
            { name: 'productCategory.name', weight: 0.1 },
            { name: 'productSubCategory.name', weight: 0.1 },
            { name: 'petType', weight: 0.05 },
            { name: 'description', weight: 0.05 },
          ],
          threshold: 0.4,        // More lenient: catches typos and partial matches
          distance: 100,         // Allow matches further into string
          minMatchCharLength: 2, // Start matching from 2 chars
          includeScore: true,
          ignoreLocation: true,  // Don't penalize matches at end of string
          useExtendedSearch: true, // Enables prefix matching with ^
        });
        setFuseInstance(fuse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchData();

    const storedDeliveryTime = localStorage.getItem('petric_delivery_time');
    if (storedDeliveryTime) setDeliveryTime(storedDeliveryTime);

    const handleDeliveryTimeUpdate = (e) => setDeliveryTime(e.detail);
    window.addEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);

    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Search with deduplication and best-match scoring
  useEffect(() => {
    const query = inputValue.trim();
    if (!query || !fuseInstance) {
      setSearchResults([]);
      setHighlightedIndex(-1);
      return;
    }

    // Run both a prefix search (^query) and a fuzzy search, merge results
    const prefixResults = fuseInstance.search(`^${query}`);
    const fuzzyResults = fuseInstance.search(query);

    // Merge: prefix results first, then fuzzy, deduplicated by _id
    const seen = new Set();
    const merged = [];
    for (const r of [...prefixResults, ...fuzzyResults]) {
      if (!seen.has(r.item._id)) {
        seen.add(r.item._id);
        merged.push(r);
      }
    }

    // Sort by score (lower = better match)
    merged.sort((a, b) => (a.score ?? 1) - (b.score ?? 1));

    setSearchResults(merged.map(r => r.item).slice(0, 8));
    setHighlightedIndex(-1);
  }, [inputValue, fuseInstance]);

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
    <div className="w-full flex flex-col font-sans">
      {/* Top Navbar */}
      <div className="bg-white py-3 px-4 md:px-8 flex items-center justify-between gap-3 md:gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Petric Logo" className="h-8 md:h-14 object-contain" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-3xl relative group" ref={searchContainerRef}>
          <div className={`relative flex items-center w-full h-10 md:h-12 rounded-full border bg-white overflow-hidden transition-colors duration-200 ${isFocused ? 'border-black shadow-md' : 'border-gray-400 group-hover:border-black'}`}>
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
                onChange={(e) => setInputValue(e.target.value)}
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

            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block border-b border-black hover:border-[#FFD000] transition-colors duration-200 z-20">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-xs text-black font-medium whitespace-nowrap hover:text-gray-700 transition-colors duration-200"
              >
                {deliveryTime ? `Delivery in ${deliveryTime} mins` : 'Check Delivery Time'}
              </button>
            </div>
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl mt-2 z-50 border border-gray-100 overflow-hidden">

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
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 md:gap-8 flex-shrink-0">
          <button
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.petric.app&hl=en_IN', '_blank')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-sm transform hover:scale-105"
          >
            Download App
          </button>
          <Link to="/reorder" className="group flex flex-row items-center gap-1.5 text-gray-800 hover:text-black transition-all duration-300 hover:scale-105">
            <BsArrowRepeat className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="text-sm font-medium">Reorder</span>
          </Link>
          <button className="flex flex-row items-center gap-1.5 text-gray-800 hover:text-black border border-gray-400 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-black hover:shadow-sm bg-white">
            <FiUser className="h-5 w-5" />
            <span className="text-sm font-medium">{user ? user.mobileNo : 'Account'}</span>
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="lg:hidden flex items-center shrink-0 relative">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black p-1">
            <FiMenu className="h-6 w-6" />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-10 right-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col py-2 z-50">
              <button className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-gray-50 flex items-center gap-2">
                <span className="bg-[#FFD000] text-black px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">App</span> Download App
              </button>
              <Link to="/reorder" className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2">
                <BsArrowRepeat className="h-4 w-4" /> Reorder
              </Link>
              <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2">
                <FiUser className="h-4 w-4" /> {user ? user.mobileNo : 'Account'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Categories Sub-navbar */}
      <div className="bg-[#FFD000] px-3 py-2.5 md:py-3.5 md:px-8 relative z-40">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="rounded-2xl border border-black/10 bg-white/90 p-2 shadow-sm">
            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-5 bg-gradient-to-r from-white/95 to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-5 bg-gradient-to-l from-white/95 to-transparent"></div>
              <div className="flex items-center gap-2 overflow-x-auto px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <Link
                  to="/all-categories"
                  className="shrink-0 rounded-full bg-black px-3.5 py-2 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                >
                  <FiGrid className="h-3.5 w-3.5" strokeWidth={2.8} />
                  All Categories
                </Link>
                {navCategories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}
                    state={{ categoryName: category.name }}
                    className="shrink-0 whitespace-nowrap rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-[#FFF4B8]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <Link
            to="/all-categories"
            className="relative overflow-hidden group px-3 py-1 rounded-md text-black text-lg font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] shrink-0 isolate"
          >
            <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
            All Categories
          </Link>

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
                className="relative overflow-hidden group px-3 py-1 rounded-md text-black text-lg font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] flex items-center gap-1 isolate"
              >
                <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
                {category.name}
                <FiChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
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

          <div className="flex-1 min-w-[20px]"></div>
          <button className="bg-black text-white p-1 rounded-full shrink-0 flex items-center justify-center h-8 w-8 sticky right-0 transition-transform duration-300 hover:scale-110 hover:shadow-lg">
            <FiChevronRight className="h-5 w-5 text-[#FFD000]" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Mobile Delivery Time Bar */}
      <div className="md:hidden bg-black px-4 py-2.5 flex items-center justify-between text-white shadow-sm z-30 relative">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-[#FFD000] h-4 w-4 shrink-0" />
          <span className="text-xs font-medium truncate max-w-[200px]">
            {deliveryTime ? `Delivery in ${deliveryTime} mins to your location` : 'Want to check delivery time?'}
          </span>
        </div>
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="bg-[#FFD000] text-black px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-transform active:scale-95 shrink-0"
        >
          {deliveryTime ? 'Change' : 'Check Now'}
        </button>
      </div>

      <DeliveryLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
}