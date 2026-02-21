/**
 * Shim for useConversations hook - returns empty state for Remotion
 */

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  last_message_preview: string;
  user_id: string;
  archived?: boolean;
}

export interface UseConversationsReturn {
  conversations: Conversation[];
  loading: boolean;
  user: null;
  guestUserId: string | null;
  effectiveUserId: string | null;
  filter: "all" | "archived" | "active";
  setFilter: (filter: "all" | "archived" | "active") => void;
  list: Conversation[];
  create: () => Promise<string | null>;
  remove: (id: string) => Promise<boolean>;
  rename: (id: string, title: string) => Promise<boolean>;
  archive: (id: string) => Promise<boolean>;
  unarchive: (id: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useConversations(): UseConversationsReturn {
  return {
    conversations: [],
    loading: false,
    user: null,
    guestUserId: null,
    effectiveUserId: null,
    filter: "all",
    setFilter: () => {},
    list: [],
    create: async () => null,
    remove: async () => true,
    rename: async () => true,
    archive: async () => true,
    unarchive: async () => true,
    refresh: async () => {},
  };
}
