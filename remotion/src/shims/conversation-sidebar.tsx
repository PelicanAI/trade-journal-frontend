/**
 * Shim for ConversationSidebar - simplified version for Remotion
 */
import React from "react";

interface ConversationSidebarProps {
  currentConversationId?: string;
  onConversationSelect?: (id: string) => void;
  onNewConversation?: () => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileSheet?: boolean;
  isNavigating?: boolean;
  navigatingToId?: string;
}

// This is a placeholder - the actual component will be rendered separately in compositions
export function ConversationSidebar(props: ConversationSidebarProps) {
  return <div className="conversation-sidebar-shim" />;
}
