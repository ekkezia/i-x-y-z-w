'use client'

import { useEffect, useState } from 'react';

const useBreakpoints = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsExtraLargeScreen(window.innerWidth <= 1200);
      setIsLargeScreen(window.innerWidth <= 984);
      setIsMediumScreen(window.innerWidth <= 744);
      setIsSmallScreen(window.innerWidth <= 464);
      setIsExtraSmallScreen(window.innerWidth <= 320);
    };

    window.addEventListener('resize', handleResize);

    // Initial call to set initial state based on window width
    handleResize();

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isLargeScreen,
    isExtraLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isExtraSmallScreen,
  };
};

export default useBreakpoints;
