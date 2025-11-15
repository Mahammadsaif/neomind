'use client'

import { useState } from 'react'
import { PaperPlaneRight, Paperclip } from '@phosphor-icons/react'

interface ComposerProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function Composer({ onSendMessage, isLoading }: ComposerProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="p-4 bg-background/50 backdrop-blur-sm border-t border-border/30">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3 max-w-3xl mx-auto">
        <button
          type="button"
          className="p-2.5 text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:border-foreground/20 glass-subtle"
        >
          <Paperclip size={16} />
        </button>
        
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask NeoMind about your memories..."
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 resize-none min-h-[56px] text-sm glass-subtle"
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <PaperPlaneRight size={16} weight="fill" />
        </button>
      </form>
    </div>
  )
}