import { AppShell } from '@/components/AppShell'
import { ChatInterface } from '@/components/chat/ChatInterface'

export default function ChatPage() {
  return (
    <AppShell>
      <div className="h-full">
        <ChatInterface />
      </div>
    </AppShell>
  )
}