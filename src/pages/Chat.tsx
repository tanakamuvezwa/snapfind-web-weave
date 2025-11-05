import { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, ArrowLeft, Search, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  where, 
  doc, 
  updateDoc, 
  Timestamp 
} from 'firebase/firestore';

type Conversation = {
  id: string;
  participants: string[];
  participantDetails: { [uid: string]: { name: string; avatar: string } };
  lastMessage: string;
  lastMessageTimestamp: Timestamp;
  unreadCount: { [uid: string]: number };
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: Timestamp;
};

export default function Chat() {
  const [user] = useAuthState(auth);
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'wide';

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'sellers' | 'buyers'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const q = query(collection(db, 'conversations'), where('participants', 'array-contains', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convos: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        convos.push({ id: doc.id, ...doc.data() } as Conversation);
      });
      // Sort by last message timestamp
      convos.sort((a, b) => b.lastMessageTimestamp.toMillis() - a.lastMessageTimestamp.toMillis());
      setConversations(convos);
      setLoading(false);
      
      if (isDesktop && !selectedConversation && convos.length > 0) {
        setSelectedConversation(convos[0]);
      }
    });

    return () => unsubscribe();
  }, [user, isDesktop, selectedConversation]);

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }
    const messagesQuery = query(collection(db, 'conversations', selectedConversation.id, 'messages'), orderBy('createdAt'));

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() && selectedConversation && user) {
      const text = newMessage.trim();
      setNewMessage('');

      const messageData = {
        text,
        senderId: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'conversations', selectedConversation.id, 'messages'), messageData);

      const conversationRef = doc(db, 'conversations', selectedConversation.id);
      await updateDoc(conversationRef, {
        lastMessage: text,
        lastMessageTimestamp: serverTimestamp(),
      });
    }
  };

  const getOtherParticipant = (convo: Conversation) => {
    if (!user) return { name: '', avatar: '' };
    const otherUid = convo.participants.find(uid => uid !== user.uid);
    return convo.participantDetails[otherUid || ''] || { name: 'Unknown', avatar: '👤' };
  }

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
            <TabsTrigger value="sellers" className="text-xs"><Store className="h-3 w-3 mr-1" />Sellers</TabsTrigger>
            <TabsTrigger value="buyers" className="text-xs"><User className="h-3 w-3 mr-1" />Buyers</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-2">
        {loading ? <p>Loading chats...</p> : conversations.map((conv) => {
          const otherParticipant = getOtherParticipant(conv);
          return (
            <button key={conv.id} onClick={() => setSelectedConversation(conv)} className={`w-full glass-card-hover p-4 flex items-center gap-3 border-l-2 ${
                selectedConversation?.id === conv.id ? 'bg-primary/20 border-primary' : 'border-transparent'
              }`}>
              <div className="text-3xl flex-shrink-0 relative">{otherParticipant.avatar}</div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{otherParticipant.name}</h3>
                  <span className="text-xs text-muted-foreground ml-2">{conv.lastMessageTimestamp?.toDate().toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!user) return <div>Please log in to see your messages.</div>
    if (!selectedConversation) return <div className="glass-card flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)] items-center justify-center hidden md:flex"><div className="text-center"><p className="text-2xl font-semibold">Welcome, {user.displayName || 'User'}</p><p className="text-muted-foreground mt-2">Select a conversation to start chatting</p></div></div>;

    const otherParticipant = getOtherParticipant(selectedConversation);

    return (
        <div className="glass-card flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)]">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            {!isDesktop && <Button size="icon" variant="ghost" onClick={() => setSelectedConversation(null)}><ArrowLeft className="h-5 w-5" /></Button>}
            <div className="text-3xl">{otherParticipant.avatar}</div>
            <div className="flex-1"><h3 className="font-semibold">{otherParticipant.name}</h3></div>
            <Button size="icon" variant="ghost"><MoreVertical className="h-5 w-5" /></Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] lg:max-w-[60%] rounded-2xl px-4 py-3 ${msg.senderId === user.uid ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.senderId === user.uid ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
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
              <Button size="icon" className="bg-primary hover:bg-primary-glow" onClick={handleSend} disabled={!newMessage.trim()}><Send className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
      );
  };

  if (!user) {
    return <div className="w-full text-center p-8">Please sign in to view your messages.</div>
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-8 px-4 pt-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className={isDesktop ? "grid grid-cols-12 gap-6" : ""}>
        {isDesktop ? <div className="col-span-4"><ChatList /></div> : !selectedConversation && <ChatList />}
        <div className={isDesktop ? "col-span-8" : ""}>
          {isDesktop || selectedConversation ? <ChatWindow /> : null}
        </div>
      </div>
    </div>
  );
}
