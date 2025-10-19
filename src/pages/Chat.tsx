import { useState } from 'react';
import { Send, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const conversations = [
  { id: 1, name: 'John D.', message: 'Is this still available?', time: '2m ago', unread: 2, avatar: '👤' },
  { id: 2, name: 'Sarah M.', message: 'Can we meet tomorrow?', time: '1h ago', unread: 0, avatar: '👩' },
  { id: 3, name: 'Mike R.', message: 'Thanks!', time: '3h ago', unread: 0, avatar: '👨' },
  { id: 4, name: 'Emma L.', message: 'What\'s the lowest price?', time: '1d ago', unread: 1, avatar: '👩' },
];

const messages = [
  { id: 1, text: 'Hi! Is the iPhone still available?', sent: false, time: '10:30 AM' },
  { id: 2, text: 'Yes, it is! Are you interested?', sent: true, time: '10:32 AM' },
  { id: 3, text: 'Yes! Can we meet today?', sent: false, time: '10:35 AM' },
  { id: 4, text: 'Sure, how about 3 PM at Central Park?', sent: true, time: '10:37 AM' },
  { id: 5, text: 'Perfect! See you there', sent: false, time: '10:40 AM' },
];

export default function Chat() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [selectedChat, setSelectedChat] = useState(isDesktop ? 1 : null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const ChatList = () => (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => setSelectedChat(conv.id)}
          className={`w-full glass-card-hover p-4 flex items-center gap-3 ${
            selectedChat === conv.id ? 'bg-primary/20 border-primary' : ''
          }`}
        >
          <div className="text-3xl flex-shrink-0">{conv.avatar}</div>
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold truncate">{conv.name}</h3>
              <span className="text-xs text-muted-foreground ml-2">{conv.time}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
          </div>
          {conv.unread > 0 && (
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {conv.unread}
            </div>
          )}
        </button>
      ))}
    </div>
  );

  const ChatWindow = () => (
    <div className="glass-card flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        {!isDesktop && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSelectedChat(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="text-3xl">👤</div>
        <div className="flex-1">
          <h3 className="font-semibold">John D.</h3>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] lg:max-w-[60%] rounded-2xl px-4 py-3 ${
                msg.sent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="bg-card/50"
          />
          <Button
            size="icon"
            className="bg-primary hover:bg-primary-glow"
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {isDesktop ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <ChatList />
          </div>
          <div className="col-span-8">
            <ChatWindow />
          </div>
        </div>
      ) : (
        <>
          {!selectedChat ? <ChatList /> : <ChatWindow />}
        </>
      )}
    </div>
  );
}
