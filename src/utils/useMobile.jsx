import { useEffect, useState } from "react";
import { MOBILE_RESOLUTION_THRESHOLD } from "./Constants";

const query = `(max-width: ${MOBILE_RESOLUTION_THRESHOLD}px)`;

export function useMobile() {
  const [mobile, setMobile] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handler = e => setMobile(e.matches);
    window.matchMedia(query).addListener(handler);
  }, []);

  return mobile;
}
