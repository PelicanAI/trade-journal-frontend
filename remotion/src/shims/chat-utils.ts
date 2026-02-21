/**
 * Shim for chat-utils types - for Remotion
 */

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  isPinned?: boolean;
  isEdited?: boolean;
  attachments?: Attachment[];
  retryAction?: () => void;
}

export interface Attachment {
  type: string;
  name: string;
  url: string;
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createUserMessage(content: string): Message {
  return {
    id: generateMessageId(),
    role: "user",
    content,
    timestamp: new Date(),
  };
}

export function createAssistantMessage(content = ""): Message {
  return {
    id: generateMessageId(),
    role: "assistant",
    content,
    timestamp: new Date(),
    isStreaming: true,
  };
}
