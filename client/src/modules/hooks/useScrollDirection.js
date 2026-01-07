import { useState, useEffect } from 'react';

/**
 * Custom hook to determine the current scroll direction and position.
 * It returns 'up', 'down', or null (for initial or top position).
 */
const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    // Function to run on every scroll event
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Only update state if the direction actually changes or if we hit the top
      if (direction !== scrollDir && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDir(direction);
      }

      setScrollY(scrollY); // Always update the current Y position
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    // Attach the event listener to the window
    window.addEventListener('scroll', updateScrollDirection);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDir]); // Re-run effect if scrollDir changes to correctly update the closure's state

  return { scrollDir, scrollY };
};

export default useScrollDirection;