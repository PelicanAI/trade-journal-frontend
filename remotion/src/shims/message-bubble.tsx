/**
 * Shim for MessageBubble - simplified version for Remotion
 */
import React from "react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  isPinned?: boolean;
  isEdited?: boolean;
  attachments?: Array<{ type: string; name: string; url: string }>;
  retryAction?: () => void;
}

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
  showSkeleton?: boolean;
  isDarkMode?: boolean;
  onRegenerate?: () => void;
  onStop?: () => void;
  onReaction?: (messageId: string, reaction: "like" | "dislike") => void;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
  onPin?: (id: string) => void;
}

// This is a placeholder - the actual component will be rendered separately in compositions
export function MessageBubble(props: MessageBubbleProps) {
  return <div className="message-bubble-shim">{props.message.content}</div>;
}
