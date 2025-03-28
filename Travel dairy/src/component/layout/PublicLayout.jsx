import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    console.log("Navigating to:", location.pathname);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    document.body.style.scrollBehavior = 'auto';
  }, [location.pathname]);

  return <>{children}</>;
};

export default PublicLayout;
