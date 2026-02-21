import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.overrideWebpackConfig((currentConfiguration) => {
  const withTailwind = enableTailwind(currentConfiguration);

  // Project root (one level up from remotion folder)
  const projectRoot = require("path").resolve(__dirname, "..");
  const shimsDir = require("path").resolve(__dirname, "src/shims");

  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...withTailwind.resolve?.alias,

        // Map @/ to project root for path aliases
        "@": projectRoot,

        // Shim Next.js components
        "next/image": require("path").join(shimsDir, "next-image.tsx"),
        "next/link": require("path").join(shimsDir, "next-link.tsx"),
        "next/navigation": require("path").join(shimsDir, "next-navigation.tsx"),

        // Shim context providers and hooks
        "@/lib/providers/translation-provider": require("path").join(shimsDir, "translation-provider.tsx"),
        "@/lib/providers/auth-provider": require("path").join(shimsDir, "auth-provider.tsx"),
        "@/hooks/use-conversations": require("path").join(shimsDir, "use-conversations.ts"),
        "@/hooks/use-toast": require("path").join(shimsDir, "use-toast.ts"),

        // Shim components that use Next.js features
        "@/components/theme-toggle": require("path").join(shimsDir, "theme-toggle.tsx"),
        "@/components/language-selector": require("path").join(shimsDir, "language-selector.tsx"),
        "@/components/ui/animated-theme-toggle": require("path").join(shimsDir, "theme-toggle.tsx"),

        // Shim chat components for Remotion
        "@/components/chat/conversation-sidebar": require("path").join(shimsDir, "conversation-sidebar.tsx"),
        "@/components/chat/chat-header": require("path").join(shimsDir, "chat-header.tsx"),
        "@/components/chat/message-bubble": require("path").join(shimsDir, "message-bubble.tsx"),
        "@/components/chat/chat-input": require("path").join(shimsDir, "chat-input.tsx"),
        "@/lib/chat-utils": require("path").join(shimsDir, "chat-utils.ts"),
      },
    },
  };
});
