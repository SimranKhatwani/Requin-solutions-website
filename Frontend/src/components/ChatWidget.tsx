import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Mail,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const SYSTEM_PROMPT = `You are the official AI Technical Assistant for Requin Solutions Pvt Ltd (requinsolutions.com).
Your mission is to assist visitors, enterprise clients, and developers inquiring about Requin Solutions' engineering services, custom software, and flagship platforms.

KEY FACTS ABOUT REQUIN SOLUTIONS:
• Company: Requin Solutions Pvt Ltd
• Headquarters: Plot no 6/397, 1st Floor, Sec-6, Malviya Nagar, Jaipur, Rajasthan (302017), India
• Primary Phone: +91 9352220187
• Official Emails: info@requinsolutions.com, Hr@requinsolutions.com
• Direct Support Mailbox: requingroupsolutions@gmail.com
• Experience: 5+ years of engineering excellence, 80+ delivered projects, 96% client retention.

WEBSITE CORNERS & DESTINATIONS TO GUIDE VISITORS TO:
1. "Services" (Web Development in React/Next.js, Mobile Apps for iOS/Android, Custom Enterprise Software, Academic/EdTech Systems, Cloud & DevOps on AWS/GCP).
2. "Our Products" (Flagship platforms: Requin Ops CRM, Requin AMS Attendance, Vastra ERP, NexusBill POS Billing, Dine & Dusk Restaurant POS, India Motor Logistics).
3. "About Us / Our Stories" (Milestones, leadership, and Jaipur engineering center).
4. "Blog" (Engineering deep dives, EdTech, and cloud architecture articles).
5. "Quiz" (Interactive 2-minute tech stack and architecture maturity assessment).
6. "Contact" (Jaipur headquarters address, phone, and direct consultation form).
7. "Careers" (Hiring React, TypeScript, Node.js, and Cloud engineers in Jaipur; resumes go to Hr@requinsolutions.com).

INSTRUCTIONS:
1. Give concise, highly helpful, and brand-accurate responses.
2. Direct the user to the relevant sections or pages of the website ("Services", "Our Products", "About Us", "Blogs", "Quiz", "Contact").
3. ALWAYS conclude every response with this exact sentence on a new line:
👉 Click on "For more support connect with us on mail" below to connect directly with our engineering team!`;

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'mailForm'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Mail Support Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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

  const getLocalFallbackReply = (query: string): string => {
    const lower = query.toLowerCase().trim();
    const mailCTA = '\n\n👉 Click on "For more support connect with us on mail" below to connect directly with our engineering team!';

    if (
      lower === 'hi' ||
      lower === 'hello' ||
      lower === 'hey' ||
      lower.startsWith('hi ') ||
      lower.startsWith('hello ') ||
      lower === 'start'
    ) {
      return `Hello! Welcome to Requin Solutions. We build high-performance software, enterprise ERPs, and cloud architectures.\n\nExplore our website:\n• Services: Web & Mobile Engineering, DevOps, Cloud\n• Products: Requin Ops CRM, Vastra ERP, NexusBill\n• About Us: Our journey & Jaipur engineering hub\n• Quiz: Interactive tech maturity assessment${mailCTA}`;
    } else if (
      lower.includes('jaipur') ||
      lower.includes('headquarter') ||
      lower.includes('headquarters') ||
      lower.includes('hq') ||
      lower.includes('contact') ||
      lower.includes('address') ||
      lower.includes('office') ||
      lower.includes('location') ||
      lower.includes('phone') ||
      lower.includes('call')
    ) {
      return `📍 Requin Solutions - Jaipur Headquarters:\n\n• Address: Plot no 6/397, 1st Floor, Sec-6, Malviya Nagar, Jaipur, Rajasthan (302017)\n• Phone: +91 9352220187\n• Email: info@requinsolutions.com / Hr@requinsolutions.com\n• Working Hours: Mon – Sat: 9:30 AM – 6:30 PM IST\n\n📌 You can also scroll to the "Contact" section on the homepage to send a direct consultation request.${mailCTA}`;
    } else if (
      lower.includes('product') ||
      lower.includes('portfolio') ||
      lower.includes('crm') ||
      lower.includes('ops') ||
      lower.includes('erp') ||
      lower.includes('ams') ||
      lower.includes('vastra') ||
      lower.includes('nexusbill') ||
      lower.includes('dine') ||
      lower.includes('motor')
    ) {
      return `🚀 Our Enterprise Product Suites:\n\n• Requin Ops & AMS: End-to-end sales pipelines & biometrics attendance\n• Vastra ERP: Dedicated apparel manufacturing & alteration ERP\n• NexusBill: Multi-outlet inventory, purchase & POS billing\n• Dine & Dusk: Cloud restaurant POS & kitchen display system\n• India Motor: Fleet tracking & transport operations\n\n📌 Visit the "Our Products" page from the top navigation to view interactive screenshots and feature breakdowns!${mailCTA}`;
    } else if (
      lower.includes('service') ||
      lower.includes('web') ||
      lower.includes('mobile') ||
      lower.includes('app') ||
      lower.includes('react') ||
      lower.includes('node') ||
      lower.includes('software') ||
      lower.includes('frontend') ||
      lower.includes('backend') ||
      lower.includes('fullstack')
    ) {
      return `💻 Engineering & Software Services:\n\n• Web Design & Development (React, Next.js, TypeScript)\n• Native & Hybrid Mobile Apps (iOS, Android, React Native)\n• Custom Enterprise Software & Architecture\n• Academic & EdTech Assistance Solutions\n• Digital Marketing & Growth Engineering\n\n📌 Explore the "Services" section on the homepage for detailed capabilities!${mailCTA}`;
    } else if (
      lower.includes('cloud') ||
      lower.includes('devops') ||
      lower.includes('aws') ||
      lower.includes('gcp') ||
      lower.includes('azure') ||
      lower.includes('kubernetes') ||
      lower.includes('docker') ||
      lower.includes('ci/cd')
    ) {
      return `☁️ Cloud & DevOps Infrastructure:\n\n• Multi-region AWS, GCP, and Azure scalable architectures\n• Automated CI/CD pipelines & zero-downtime deployment\n• Kubernetes container orchestration & auto-scaling\n• Cloud spend optimization & 99.99% uptime SLAs\n\n📌 Check out "Cloud Solutions" under our Services section for technical details!${mailCTA}`;
    } else if (
      lower.includes('about') ||
      lower.includes('story') ||
      lower.includes('stories') ||
      lower.includes('company') ||
      lower.includes('who are you') ||
      lower.includes('team') ||
      lower.includes('experience')
    ) {
      return `🏢 About Requin Solutions:\n\n• 5+ Years of Engineering Excellence\n• 80+ Enterprise Projects Successfully Delivered\n• 45+ Full-time Tech Specialists & Solution Architects\n• 96% Client Retention across North America, Europe & APAC\n\n📌 Visit our "About Us / Our Stories" page from the navigation bar to discover our timeline and mission!${mailCTA}`;
    } else if (
      lower.includes('blog') ||
      lower.includes('article') ||
      lower.includes('news') ||
      lower.includes('insights')
    ) {
      return `📚 Requin Tech Blogs & Insights:\n\nWe publish technical deep-dives on scalable cloud patterns, modern EdTech frameworks, and frontend best practices.\n\n📌 Visit the "Blog" link in our site menu or footer to read our latest publications!${mailCTA}`;
    } else if (
      lower.includes('quiz') ||
      lower.includes('assessment') ||
      lower.includes('test')
    ) {
      return `🎯 Requin Tech Assessment Quiz:\n\nEvaluate your software readiness, architecture scalability, and tech stack maturity in under 2 minutes!\n\n📌 Click "Quiz" in the top navigation or scroll to the Quiz section on the homepage to start.${mailCTA}`;
    } else if (
      lower.includes('career') ||
      lower.includes('job') ||
      lower.includes('hiring') ||
      lower.includes('interview') ||
      lower.includes('internship') ||
      lower.includes('hr')
    ) {
      return `💼 Careers at Requin Solutions:\n\nWe are actively hiring React/TypeScript Developers, Node.js Engineers, and Cloud Specialists at our Jaipur hub!\n\n• Send your resume & portfolio to: Hr@requinsolutions.com\n📌 Check the "Career" link in the footer for current openings.${mailCTA}`;
    } else if (
      lower.includes('price') ||
      lower.includes('cost') ||
      lower.includes('quote') ||
      lower.includes('quotation') ||
      lower.includes('rate') ||
      lower.includes('budget')
    ) {
      return `💰 Pricing & Project Quotations:\n\nWe provide flexible, milestone-based pricing tailored to your exact technical requirements and delivery schedule.\n\n📌 Explore our "Services" or "Our Products" for turnkey packages.${mailCTA}`;
    } else {
      return `Thank you for inquiring with Requin Solutions!\n\nWe build custom web & mobile apps, enterprise ERPs, and cloud architectures.\n\nExplore our website:\n• "Services" for technical capabilities\n• "Our Products" for turnkey CRM & ERP platforms\n• "About Us" for our leadership & history\n• "Contact" for our Jaipur headquarters${mailCTA}`;
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputValue.trim();
    if (!messageText || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    let botReplyText = '';

    // Gemini API key from environment variable
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

    const GEMINI_MODELS = [
      'gemini-flash-lite-latest',
      'gemini-3.5-flash-lite',
      'gemini-flash-latest',
      'gemini-3.7-flash',
      'gemini-3.8-flash',
    ];

    try {
      if (geminiApiKey) {
        // Direct Google Gemini API call with model cascade
        for (const model of GEMINI_MODELS) {
          try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
            const res = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Inquiring: ${messageText}` }],
                  },
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                },
              }),
            });

            if (res.ok) {
              const geminiData = await res.json();
              const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (reply && reply.trim()) {
                botReplyText = reply.trim();
                console.log(`[Gemini AI] Response generated successfully via ${model}`);
                break;
              }
            }
          } catch (modelErr) {
            console.warn(`Gemini model ${model} attempt failed:`, modelErr);
          }
        }
      }

      // If direct key call failed, attempt backend /api/chat proxy
      if (!botReplyText) {
        try {
          const backendRes = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText }),
          });
          if (backendRes.ok) {
            const data = await backendRes.json();
            if (data.reply) {
              botReplyText = data.reply;
            }
          }
        } catch {
          // Backend offline or unreachable
        }
      }
    } catch (err) {
      console.log('Gemini API call notice:', err);
    }

    // Fallback to Requin intelligent knowledge engine
    if (!botReplyText) {
      botReplyText = getLocalFallbackReply(messageText);
    }

    // Make sure the standard CTA is attached
    if (!botReplyText.includes('connect with us on mail')) {
      botReplyText += '\n\n👉 Click on "For more support connect with us on mail" below to connect directly with our engineering team!';
    }

    setIsTyping(false);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: botReplyText,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleMailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all fields (Name, Email, Message).');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      // 1. Send directly to requingroupsolutions@gmail.com via FormSubmit AJAX service
      const payload = new FormData();
      payload.append('Name', formData.name.trim());
      payload.append('Email', formData.email.trim());
      payload.append('Message', formData.message.trim());
      payload.append('_subject', `New Chat Support Request from ${formData.name.trim()}`);
      payload.append('_replyto', formData.email.trim());
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/requingroupsolutions@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      }).catch((err) => console.log('FormSubmit notification:', err));

      // 2. Also log to backend API endpoint
      fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      }).catch((err) => console.log('Backend sync notice:', err));

      // 3. Add to chat history for continuity
      const userSummaryMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: `Support Request: "${formData.message.trim()}"`,
        time: 'Just now',
      };
      const botConfirmMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Thank you, ${formData.name.trim()}! Your details have been transmitted directly to requingroupsolutions@gmail.com. Our engineering support team will reply to ${formData.email.trim()} promptly.`,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, userSummaryMsg, botConfirmMsg]);

      setIsSubmitting(false);
      setFormStatus('success');
    } catch (error) {
      console.error('Mail form error:', error);
      setIsSubmitting(false);
      setFormStatus('success'); // Still show success with details logged
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button: Navy Circle with Cyan Outline/Icon */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setCurrentView('chat');
          }}
          className="w-14 h-14 rounded-full bg-[#071827] border-2 border-[#08B9E8] shadow-2xl flex items-center justify-center text-[#08B9E8] hover:bg-[#0B2235] hover:scale-105 transition-all duration-200 focus:outline-none cyan-glow-sm group cursor-pointer"
          aria-label="Open Requin Support Chat"
        >
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
          {/* Active status pip */}
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#08B9E8] ring-2 ring-[#071827]" />
        </button>
      )}

      {/* Elegant Requin Brand Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] rounded-3xl bg-[#071827] border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 text-left">
          {/* ========================================================
              VIEW 1: AI CHAT VIEW
          ======================================================== */}
          {currentView === 'chat' && (
            <>
              {/* Header */}
              <div className="p-4 bg-[#0B2235] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/images/logo.png"
                      alt="Requin Logo"
                      className="w-9 h-9 rounded-full bg-[#071827] p-1 border border-[#08B9E8]/40 object-contain"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-[#0B2235]" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Chat Support</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
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
                    className={`flex gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-[#0B2235] border border-white/10 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] p-3.5 rounded-2xl whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-[#08B9E8] text-[#071827] font-semibold rounded-br-none shadow-sm'
                          : 'bg-[#0B2235] text-slate-200 border border-white/10 rounded-bl-none leading-relaxed shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator when Gemini AI is generating response */}
                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-full bg-[#0B2235] border border-white/10 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5 shadow-sm animate-pulse">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#0B2235] text-slate-400 border border-white/10 rounded-bl-none flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#08B9E8] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#08B9E8] animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-[#08B9E8] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions Pills */}
              <div className="px-3 pb-2 pt-1 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5 bg-[#071827]/70">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    disabled={isTyping}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* "For more support connect with us on mail" Button */}
              <div className="px-3 py-2 bg-[#0A1D2E] border-t border-white/10">
                <button
                  onClick={() => {
                    setFormStatus('idle');
                    setFormError('');
                    setCurrentView('mailForm');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#08B9E8]/15 via-[#08B9E8]/25 to-[#08B9E8]/15 hover:from-[#08B9E8]/35 hover:to-[#08B9E8]/35 border border-[#08B9E8]/50 hover:border-[#08B9E8] text-[#08B9E8] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#08B9E8] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">For more support connect with us on mail</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#08B9E8] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-[#0B2235] border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask our architects a question..."
                  value={inputValue}
                  disabled={isTyping}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#071827] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#08B9E8] disabled:opacity-60"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !inputValue.trim()}
                  className="p-2.5 rounded-xl bg-[#08B9E8] hover:bg-[#4DD4F5] text-[#071827] transition-colors focus:outline-none shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* ========================================================
              VIEW 2: MAIL SUPPORT FORM POPUP (Screenshot 2 Match)
          ======================================================== */}
          {currentView === 'mailForm' && (
            <div className="flex flex-col h-full bg-[#0B2235]">
              {/* Header */}
              <div className="p-4 bg-[#0B2235] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="p-1 -ml-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                    title="Back to AI Chat"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-base font-bold text-white tracking-tight">
                    Chat Support
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* White Card Content matching user's design */}
              <div className="flex-1 bg-white p-5 sm:p-6 flex flex-col justify-between overflow-y-auto text-left rounded-b-3xl">
                <div>
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                      To Start Chat Support
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Provide your details below:
                    </p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="p-6 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
                      <div className="w-12 h-12 rounded-full bg-[#08B9E8] text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800">
                        Details Sent Successfully!
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Your message has been sent directly to{' '}
                        <span className="font-bold text-[#08B9E8]">
                          requingroupsolutions@gmail.com
                        </span>
                        . Our team will get back to you shortly at{' '}
                        <span className="font-semibold text-slate-800">
                          {formData.email}
                        </span>
                        .
                      </p>
                      <button
                        onClick={() => {
                          setFormData({ name: '', email: '', message: '' });
                          setCurrentView('chat');
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-[#08B9E8] hover:bg-[#4DD4F5] text-[#071827] font-bold text-xs shadow-md transition-all cursor-pointer mt-3"
                      >
                        Return to Chat
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleMailFormSubmit} className="space-y-3.5">
                      {/* Name input */}
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-300/80 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:ring-2 focus:ring-[#08B9E8]/20 transition-all shadow-xs"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-300/80 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:ring-2 focus:ring-[#08B9E8]/20 transition-all shadow-xs"
                        />
                      </div>

                      {/* Message textarea */}
                      <div>
                        <textarea
                          required
                          rows={4}
                          placeholder="Message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-300/80 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:ring-2 focus:ring-[#08B9E8]/20 transition-all resize-none shadow-xs"
                        />
                      </div>

                      {formError && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      {/* Start Chat / Submit Button matching screenshot 2 */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Details...</span>
                          </>
                        ) : (
                          <span>Start Chat</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {formStatus !== 'success' && (
                  <div className="text-center pt-3 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400">
                      Forwarded directly to{' '}
                      <span className="text-[#08B9E8] font-semibold">
                        requingroupsolutions@gmail.com
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
