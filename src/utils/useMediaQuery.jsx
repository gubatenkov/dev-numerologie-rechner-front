import { useEffect, useState } from "react";
import { MOBILE_RESOLUTION_THRESHOLD } from "./Constants";

export function useMediaQuery(width = MOBILE_RESOLUTION_THRESHOLD) {
  const query = `(max-width: ${width}px)`;

  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    window.matchMedia(query).addListener(handler);
  }, [query]);

  return matches;
}
