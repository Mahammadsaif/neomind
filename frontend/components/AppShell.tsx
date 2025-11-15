'use client'

import { useState } from 'react'
import { 
  ChatCircle, 
  Brain, 
  User, 
  MagnifyingGlass,
  Cube,
  PushPin,
  Clock,
  Plus,
  CaretRight
} from '@phosphor-icons/react'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState('chat')
  const [searchFocused, setSearchFocused] = useState(false)

  const navItems = [
    { id: 'chat', icon: ChatCircle, label: 'Chat' },
    { id: 'memory', icon: Brain, label: 'Memory' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  const pinnedChats = [
    { id: '1', title: 'AWS Learning', unread: 2 },
    { id: '2', title: 'Project Docs', unread: 0 },
  ]

  const recentChats = [
    { id: '3', title: 'React Patterns', time: '2h ago' },
    { id: '4', title: 'System Design', time: '1d ago' },
  ]

  const reminders = [
    { id: '1', title: 'Review AWS notes', time: 'Tomorrow' },
    { id: '2', title: 'Project milestones', time: 'In 2 days' },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Slim Premium Sidebar */}
      <div className="w-64 glass-intense border-r border-border/30 flex flex-col">
        {/* Logo - Compact */}
        <div className="p-5 border-b border-border/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Cube weight="fill" size={16} className="text-background" />
            </div>
            <div>
              <h1 className="text-lg font-semibold gradient-text">NeoMind</h1>
              <p className="text-xs text-muted-foreground">Memory Assistant</p>
            </div>
          </div>
        </div>

        {/* Floating Search - Compact */}
        <div className="p-3 border-b border-border/30">
          <div className={`relative transition-all duration-200 ${
            searchFocused ? 'search-floating scale-[1.02]' : 'glass-subtle'
          }`}>
            <MagnifyingGlass 
              size={14} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none rounded-lg"
            />
          </div>
        </div>

        {/* Navigation - Compact */}
        <nav className="p-3 border-b border-border/30">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
                  }`}
                >
                  <Icon weight={isActive ? "fill" : "regular"} size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <CaretRight size={12} className="text-primary" />}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Pinned Chats - Compact */}
        <div className="flex-1 p-3 border-b border-border/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pinned</h3>
            <PushPin size={10} className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            {pinnedChats.map((chat) => (
              <div key={chat.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className={`w-1.5 h-1.5 rounded-full ${chat.unread ? 'bg-primary' : 'bg-muted-foreground/30'}`}></div>
                <span className="text-sm text-foreground/80 flex-1 truncate">{chat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Chats - Compact */}
        <div className="p-3 border-b border-border/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent</h3>
            <Clock size={10} className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/10 transition-colors cursor-pointer">
                <span className="text-sm text-foreground/70 flex-1 truncate">{chat.title}</span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders - Compact */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Reminders</h3>
            <Plus size={10} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="glass-subtle p-2 rounded-lg border border-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground truncate flex-1 mr-2">{reminder.title}</span>
                  <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded text-nowrap">{reminder.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Full Height */}
      <div className="flex-1 flex flex-col">
        {/* Minimal Topbar */}
        <header className="h-14 glass border-b border-border/30 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-base font-semibold text-foreground capitalize">
              {activeNav}
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-gradient-to-br from-primary to-green-400 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium text-background">U</span>
            </div>
          </div>
        </header>

        {/* Main Content - No extra containers */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}