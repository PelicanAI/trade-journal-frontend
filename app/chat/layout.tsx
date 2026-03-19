import type { Metadata } from 'next'
import ChatLayout from './chat-layout-client'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ChatServerLayout({ children }: { children: React.ReactNode }) {
  return <ChatLayout>{children}</ChatLayout>
}
