import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { chatSupport } from '../../util/api';
import { Page } from '../../components';

const scrollToBottom = containerRef => {
  if (containerRef?.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
};

const ChatSupportPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m SmartHome Support. How can I help with your smart home today?' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    scrollToBottom(containerRef);
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    try {
      const res = await chatSupport({ messages: nextMessages });
      if (res?.message) {
        setMessages([...nextMessages, res.message]);
      } else if (res?.error) {
        setMessages([
          ...nextMessages,
          { role: 'assistant', content: `Sorry, I couldn’t process that: ${res.error}` },
        ]);
      } else {
        setMessages([
          ...nextMessages,
          { role: 'assistant', content: 'Sorry, I could not generate a response.' },
        ]);
      }
    } catch (e) {
      // e may contain server-provided fields via util/api.js request error handling
      const serverMsg = e?.error || e?.message || 'Unexpected error';
      // Also log for developers
      // eslint-disable-next-line no-console
      console.error('ChatSupport error:', e);
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: `Sorry, I couldn’t process that: ${serverMsg}` },
      ]);
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, messages]);

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Page title="Chat Support">
      <Helmet>
        <title>Chat Support</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
        <h1>Chat Support</h1>
        <div
          ref={containerRef}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            height: 420,
            overflowY: 'auto',
            padding: 12,
            background: '#fafafa',
          }}
        >
          {messages.map((m, idx) => (
            <div key={idx} style={{ margin: '8px 0', display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap',
                  background: m.role === 'user' ? '#DCF2FF' : '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about setup, troubleshooting, Wi‑Fi, automations, compatibility…"
            rows={3}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={sendMessage} disabled={isSending || !input.trim()} style={{ padding: '8px 16px' }}>
            {isSending ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </Page>
  );
};

export default ChatSupportPage;


