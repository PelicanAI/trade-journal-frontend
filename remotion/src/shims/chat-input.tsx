/**
 * Shim for ChatInput - simplified version for Remotion
 */
import React from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (files: File[]) => void;
  disabled?: boolean;
  canSend?: boolean;
  disabledSend?: boolean;
  onQueueMessage?: (message: string) => void;
  queueEnabled?: boolean;
  placeholder?: string;
  isDarkMode?: boolean;
  onTypingDuringResponse?: () => void;
  isAIResponding?: boolean;
  onThemeChange?: (isDark: boolean) => void;
  attachments?: Array<{ name: string; type: string; url: string }>;
  onRemoveAttachment?: (index: number) => void;
  pendingAttachments?: Array<{ file: File; isError?: boolean; id: string }>;
  onRetryAttachment?: (id: string) => void;
  pendingDraft?: string | null;
  onStopResponse?: () => void;
}

export interface ChatInputRef {
  focus: () => void;
}

// This is a placeholder - the actual component will be rendered separately in compositions
export const ChatInput = React.forwardRef<ChatInputRef, ChatInputProps>(
  (props, ref) => {
    return <div className="chat-input-shim" />;
  }
);

ChatInput.displayName = "ChatInput";
