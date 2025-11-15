interface MessageProps {
  content: string
  isUser: boolean
  timestamp?: Date
}

export function Message({ content, isUser, timestamp }: MessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} slide-up`}>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isUser 
          ? 'message-user shadow-lg shadow-primary/10' 
          : 'message-assistant glass-subtle'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className={`text-xs mt-2 ${
            isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  )
}