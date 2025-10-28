import { useState } from 'react';
import { Send, MoreVertical, ArrowLeft, Search, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Conversation = {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: string;
  type: 'company' | 'individual';
};

const conversations: Conversation[] = [
  { id: 1, name: 'TechWorld Store', message: 'We have that in stock!', time: '2m ago', unread: 2, avatar: '🏪', type: 'company' },
  { id: 2, name: 'ElectroMart', message: 'Delivery available tomorrow', time: '15m ago', unread: 0, avatar: '🏬', type: 'company' },
  { id: 3, name: 'John D.', message: 'Is this still available?', time: '1h ago', unread: 1, avatar: '👤', type: 'individual' },
  { id: 4, name: 'Sarah M.', message: 'Thanks!', time: '3h ago', unread: 0, avatar: '👩', type: 'individual' },
  { id: 5, name: 'Mike R.', message: 'Can we meet tomorrow?', time: '5h ago', unread: 1, avatar: '👨', type: 'individual' },
  { id: 6, name: 'Premium Gadgets', message: 'Check our latest deals', time: '1d ago', unread: 0, avatar: '💼', type: 'company' },
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
  const [selectedChat, setSelectedChat] = useState<number | null>(isDesktop ? 1 : null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'company' | 'individual'>('all');

  const filteredConversations = conversations.filter(conv => 
    filter === 'all' ? true : conv.type === filter
  );

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const ChatList = () => (
    <div className="space-y-3">
      <div className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-card/50"
          />
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="company" className="text-xs">
              <Store className="h-3 w-3 mr-1" />
              Sellers
            </TabsTrigger>
            <TabsTrigger value="individual" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              People
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setSelectedChat(conv.id)}
            className={`w-full glass-card-hover p-4 flex items-center gap-3 border-l-2 ${
              selectedChat === conv.id 
                ? 'bg-primary/20 border-primary' 
                : conv.type === 'company'
                ? 'border-primary/30'
                : 'border-transparent'
            }`}
          >
            <div className="text-3xl flex-shrink-0 relative">
              {conv.avatar}
              {conv.type === 'company' && (
                <Store className="absolute -bottom-1 -right-1 h-3 w-3 text-primary bg-background rounded-full p-0.5" />
              )}
            </div>
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
        <div className="text-3xl">🏪</div>
        <div className="flex-1">
          <h3 className="font-semibold">TechWorld Store</h3>
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
