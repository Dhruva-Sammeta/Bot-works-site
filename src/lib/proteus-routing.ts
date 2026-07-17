export function usesNativeScroll(pathname: string) {
  return pathname === "/proteusarc" || pathname.startsWith("/proteusarc/");
}
