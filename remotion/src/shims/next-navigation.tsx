/**
 * Shim for next/navigation - provides mock implementations for Remotion
 */

export function useRouter() {
  return {
    push: () => {},
    replace: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
    prefetch: () => {},
  };
}

export function usePathname() {
  return "/chat";
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function useParams() {
  return {};
}

export function redirect(url: string) {
  // No-op in Remotion
}

export function notFound() {
  // No-op in Remotion
}
