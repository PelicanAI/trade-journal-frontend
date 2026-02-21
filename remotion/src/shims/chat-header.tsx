/**
 * Shim for ChatHeader - simplified version for Remotion
 */
import React from "react";

interface ChatHeaderProps {
  onSettingsClick?: () => void;
  onMenuClick?: () => void;
  isOnline?: boolean;
}

// This is a placeholder - the actual component will be rendered separately in compositions
export function ChatHeader(props: ChatHeaderProps) {
  return <div className="chat-header-shim" />;
}
