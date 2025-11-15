'use client'

import { MessageList } from './MessageList'
import { Composer } from './Composer'
import { useChat } from '../../hooks/useChat'

export function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat()

  return (
    <div className="h-full flex flex-col">
      {/* Messages take available space */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>
      
      {/* Composer stays at bottom */}
      <div className="shrink-0 border-t border-border/30">
        <Composer onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}