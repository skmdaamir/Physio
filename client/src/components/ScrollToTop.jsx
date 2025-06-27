import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top when path changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",// optional: "auto" for instant jump
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
