import { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, ArrowLeft, Search, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

type Conversation = {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: string;
  type: 'company' | 'individual';
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: Timestamp;
};

// Hardcoded conversations for the list
const conversations: Conversation[] = [
  { id: 1, name: 'TechWorld Store', message: 'We have that in stock!', time: '2m ago', unread: 2, avatar: '🏪', type: 'company' },
  { id: 2, name: 'ElectroMart', message: 'Delivery available tomorrow', time: '15m ago', unread: 0, avatar: '🏬', type: 'company' },
  { id: 3, name: 'John D.', message: 'Is this still available?', time: '1h ago', unread: 1, avatar: '👤', type: 'individual' },
];

// Let's pretend the current user has this ID
const CURRENT_USER_ID = 'currentUser';

export default function Chat() {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';
  const [selectedChatId, setSelectedChatId] = useState<number | null>(isDesktop ? 1 : null);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'company' | 'individual'>('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = conversations.find(c => c.id === selectedChatId);

  // Effect to scroll to the bottom of the messages list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Effect to fetch messages for the selected chat in real-time
  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      return;
    }

    // Create a unique but consistent collection ID for the chat
    const chatCollectionId = `chat_${Math.min(selectedChatId, 0)}_${Math.max(selectedChatId, 0)}`;
    const messagesQuery = query(collection(db, 'chats', chatCollectionId, 'messages'), orderBy('createdAt'));

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(fetchedMessages);
    });

    // Cleanup subscription on component unmount or when selectedChatId changes
    return () => unsubscribe();
  }, [selectedChatId]);
  
  const filteredConversations = conversations.filter(conv => 
    filter === 'all' ? true : conv.type === filter
  );

  const handleSend = async () => {
    if (newMessage.trim() && selectedChatId) {
      const chatCollectionId = `chat_${Math.min(selectedChatId, 0)}_${Math.max(selectedChatId, 0)}`;
      try {
        await addDoc(collection(db, 'chats', chatCollectionId, 'messages'), {
          text: newMessage.trim(),
          senderId: CURRENT_USER_ID,
          createdAt: serverTimestamp(),
        });
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const ChatList = () => (
    <div className="space-y-3">
      <div className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-9 bg-card/50" />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="company" className="text-xs"><Store className="h-3 w-3 mr-1" />Sellers</TabsTrigger>
            <TabsTrigger value="individual" className="text-xs"><User className="h-3 w-3 mr-1" />People</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-2">
        {filteredConversations.map((conv) => (
          <button key={conv.id} onClick={() => setSelectedChatId(conv.id)} className={`w-full glass-card-hover p-4 flex items-center gap-3 border-l-2 ${
              selectedChatId === conv.id ? 'bg-primary/20 border-primary' : conv.type === 'company' ? 'border-primary/30' : 'border-transparent'
            }`}>
            <div className="text-3xl flex-shrink-0 relative">{conv.avatar}</div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold truncate">{conv.name}</h3>
                <span className="text-xs text-muted-foreground ml-2">{conv.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
            </div>
            {conv.unread > 0 && <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">{conv.unread}</div>}
          </button>
        ))}
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!selectedChat) return <div className="glass-card flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)] items-center justify-center hidden md:flex"><div className="text-center"><p className="text-2xl font-semibold">Welcome</p><p className="text-muted-foreground mt-2">Select a conversation to start</p></div></div>;

    return (
        <div className="glass-card flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)]">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            {!isDesktop && <Button size="icon" variant="ghost" onClick={() => setSelectedChatId(null)}><ArrowLeft className="h-5 w-5" /></Button>}
            <div className="text-3xl">{selectedChat.avatar}</div>
            <div className="flex-1"><h3 className="font-semibold">{selectedChat.name}</h3><p className="text-xs text-muted-foreground">Active now</p></div>
            <Button size="icon" variant="ghost"><MoreVertical className="h-5 w-5" /></Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] lg:max-w-[60%] rounded-2xl px-4 py-3 ${msg.senderId === CURRENT_USER_ID ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.senderId === CURRENT_USER_ID ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'sending...'}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="bg-card/50" />
              <Button size="icon" className="bg-primary hover:bg-primary-glow" onClick={handleSend}><Send className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className={isDesktop ? "grid grid-cols-12 gap-6" : ""}>
        {isDesktop ? <div className="col-span-4"><ChatList /></div> : !selectedChatId && <ChatList />}
        <div className={isDesktop ? "col-span-8" : ""}>
          {isDesktop || selectedChatId ? <ChatWindow /> : null}
        </div>
      </div>
    </div>
  );
}
