 import { useEffect, useRef, useState } from "react";

export const useScrollFadeIn = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, className: `fade-up ${show ? "show" : ""}` };
};
