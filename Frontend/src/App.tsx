import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if(!input.trim() || isLoading) return; // Avoid user spamming the API with empty message, this has no sense

    const newMessages : Message[] = [...messages, {role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5152/chat', {messages: newMessages});

      setMessages([...newMessages, {
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } catch (error){
      console.error("Erreur : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      <div className="bg-blob bg-indigo-600 top-[-10%] left-[-10%]" />
      <div className="bg-blob bg-purple-600 bottom-[-10%] right-[-10%] [animation-delay:-5s]" />

      <div className="w-full max-w-7xl h-[95vh] flex flex-col rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        <header className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <h1 className="text-white font-medium tracking-wide">💬 IA ChatBot</h1>
          </div>
          <span className="text-xs text-white/40 uppercase tracking-widest">Made by Lecoeur Clément</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-2">
              <p className="text-lg">What do you want to talk about today ?</p>
              <span className="text-5xl">😊</span>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`group relative px-5 py-3 rounded-2xl transition-all ${
                m.role === 'user' 
                  ? 'bg-indigo-600/80 text-white rounded-br-none shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/10 text-white/90 border border-white/10 backdrop-blur-md rounded-bl-none'
              }`}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                <span className={`text-[10px] opacity-0 group-hover:opacity-50 transition-opacity absolute bottom-[-18px] ${m.role === 'user' ? 'right-0' : 'left-0'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl rounded-bl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </main>

        <footer className="p-6 bg-white/5 border-t border-white/10">
          <div className="relative flex items-center">
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-6 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
              placeholder="I want to talk about..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all disabled:opacity-30 disabled:grayscale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App