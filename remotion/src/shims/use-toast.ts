/**
 * Shim for useToast hook - returns no-op for Remotion
 */

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

interface Toast extends ToastProps {
  id: string;
}

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      // No-op in Remotion
      return { id: "mock-toast", ...props };
    },
    toasts: [] as Toast[],
    dismiss: (toastId?: string) => {},
  };
}

export function toast(props: ToastProps) {
  // No-op in Remotion
  return { id: "mock-toast", ...props };
}
