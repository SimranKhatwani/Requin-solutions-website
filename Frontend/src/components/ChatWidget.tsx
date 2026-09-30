import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello and welcome to Requin Solutions. How can our engineering team assist your technology initiative today?',
      time: 'Just now',
    },
  ]);

  const quickPrompts = [
    'Explore custom Web & Mobile builds',
    'Schedule a Requin Ops CRM demo',
    'Review cloud DevOps architecture',
    'Connect with Jaipur headquarters',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputValue.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Generate brand-aligned contextual reply
    setTimeout(() => {
      let replyText = 'Thank you for inquiring. Our senior technical team in Jaipur has logged your interest and will coordinate an architecture review session.';

      const lower = messageText.toLowerCase();
      if (lower.includes('crm') || lower.includes('ops') || lower.includes('product')) {
        replyText = 'Requin Ops and Requin AMS are designed for high-throughput enterprise pipelines. You can schedule a 20-minute tailored walkthrough by filling out our quick contact consultation form!';
      } else if (lower.includes('cloud') || lower.includes('devops')) {
        replyText = 'Our cloud team specializes in AWS, GCP, and Kubernetes containerization with automated CI/CD pipelines. We can review your current cloud spend and SLA requirements.';
      } else if (lower.includes('web') || lower.includes('mobile')) {
        replyText = 'We engineer full-stack modern web applications (React, Next.js, TypeScript) and native mobile apps for iOS and Android. Let us know your timeline!';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button: Navy Circle with Cyan Outline/Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#071827] border-2 border-[#08B9E8] shadow-2xl flex items-center justify-center text-[#08B9E8] hover:bg-[#0B2235] hover:scale-105 transition-all duration-200 focus:outline-none cyan-glow-sm group"
          aria-label="Open Requin Support Chat"
        >
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
          {/* Active status pip */}
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#08B9E8] ring-2 ring-[#071827]" />
        </button>
      )}

      {/* Elegant Requin Brand Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-[#071827] border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0B2235] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/LogoCircle.png"
                  alt="Requin Logo"
                  className="w-9 h-9 rounded-full bg-[#071827] p-1 border border-[#08B9E8]/40"
                  referrerPolicy="no-referrer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-[#0B2235]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Requin Consultation</span>
                </div>
                <div className="text-[11px] text-[#08B9E8]">Technical Advisory Live</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-left text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#0B2235] border border-white/10 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#08B9E8] text-[#071827] font-medium rounded-br-none'
                      : 'bg-[#0B2235] text-slate-200 border border-white/10 rounded-bl-none leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 pb-2 pt-1 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0B2235] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask our architects a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#071827] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#08B9E8]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-[#08B9E8] hover:bg-[#4DD4F5] text-[#071827] transition-colors focus:outline-none shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
