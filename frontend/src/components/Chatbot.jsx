import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function Chatbot() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I'm your BloodLink AI Assistant. Ask me anything like 'How do I register?', 'Find O+ donors', or 'What blood types are there?'", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post(`${API_BASE}/ai/chat`, { message: userMessage });

      setTimeout(() => {
        setMessages(prev => [...prev, { text: res.data.reply, sender: 'bot' }]);
        setIsTyping(false);
      }, 600);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server. Make sure it's running on port 8082.", sender: 'bot' }]);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <span>🤖 BloodLink AI</span>
            <button onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', cursor: 'pointer' }}>&times;</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender} animate-fade-in`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot animate-fade-in" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}

      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
