"use client";

import { useMediaQuery } from "@mui/material";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  return isMobile;
}
