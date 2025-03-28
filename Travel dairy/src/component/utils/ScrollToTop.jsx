import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    console.log("Global scroll to top for:", pathname);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Changed from 'instant' to 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;