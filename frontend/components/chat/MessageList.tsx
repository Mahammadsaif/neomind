import { Message } from './Message'
import { Message as MessageType } from '@/types'

interface MessageListProps {
  messages: MessageType[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            isUser={message.role === 'user'}
            timestamp={message.timestamp}
          />
        ))}
        
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-lg font-semibold mb-2 gradient-text">Welcome to NeoMind</div>
              <div className="text-sm">Your AI memory assistant is ready to help</div>
              <div className="text-xs mt-1">Ask about your saved content, progress, or summaries</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}