import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();
  const isRestoringRef = useRef(false);

  // Scroll to top on push/replace, restore on pop
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    } else {
      const savedScroll = sessionStorage.getItem(`scroll-${location.key}`);
      if (savedScroll) {
        const targetScroll = parseInt(savedScroll, 10);
        let attempts = 0;
        isRestoringRef.current = true;
        
        // Try restoring multiple times over 3 seconds to allow async data to render
        const interval = setInterval(() => {
          if (!isRestoringRef.current) {
             clearInterval(interval);
             return;
          }
          
          attempts++;
          const maxScroll = Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight,
            document.body.offsetHeight, 
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
          ) - window.innerHeight;
          
          // Allow a small threshold (10px) for layout inconsistencies
          if (maxScroll >= targetScroll - 10) {
            window.scrollTo(0, targetScroll);
            clearInterval(interval);
            setTimeout(() => { isRestoringRef.current = false; }, 200);
          } else if (attempts > 30) {
            window.scrollTo(0, Math.min(targetScroll, maxScroll)); // scroll as much as possible
            clearInterval(interval);
            setTimeout(() => { isRestoringRef.current = false; }, 200);
          }
        }, 100);
        
        return () => {
          clearInterval(interval);
          isRestoringRef.current = false;
        };
      }
    }
  }, [location, navType]);

  // Save scroll position
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (isRestoringRef.current) return;
      if (timeout) return;
      timeout = setTimeout(() => {
        sessionStorage.setItem(`scroll-${location.key}`, window.scrollY.toString());
        timeout = null;
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [location.key]);

  return null;
}