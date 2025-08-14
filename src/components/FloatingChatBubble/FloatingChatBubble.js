import React, { useState, useCallback, useRef, useEffect } from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { chatSupport } from '../../util/api';
import css from './FloatingChatBubble.module.css';

const FloatingChatBubble = ({ isOpen, onToggle, className, rootClassName }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m SmartHome Support. How can I help with your smart home today?' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const classes = classNames(rootClassName, className);

  useEffect(() => {
    if (containerRef?.current && !isMinimized) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      // Focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      setIsMinimized(true);
    }
    if (onToggle) {
      onToggle();
    }
  };

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
          { role: 'assistant', content: `Sorry, I couldn't process that: ${res.error}` },
        ]);
      } else {
        setMessages([
          ...nextMessages,
          { role: 'assistant', content: 'Sorry, I could not generate a response.' },
        ]);
      }
    } catch (e) {
      const serverMsg = e?.error || e?.message || 'Unexpected error';
      console.error('ChatSupport error:', e);
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: `Sorry, I couldn't process that: ${serverMsg}` },
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

  const handleStartNewChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hi! I\'m SmartHome Support. How can I help with your smart home today?' },
    ]);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className={classNames(css.root, classes)}>
      {/* Floating Chat Button */}
      <button
        className={css.chatButton}
        onClick={handleToggle}
        aria-label="Open chat support"
        title="Chat with AI Assistant"
      >
        <svg className={css.chatIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
        {!isMinimized && <span className={css.chatLabel}>Chat</span>}
      </button>

      {/* Chat Window */}
      <div className={classNames(css.chatWindow, { [css.minimized]: isMinimized })}>
        {/* Chat Header */}
        <div className={css.chatHeader}>
          <div className={css.chatTitle}>
            <span className={css.chatTitleIcon}>🤖</span>
            AI Assistant
          </div>
          <div className={css.chatActions}>
            <button
              className={css.actionButton}
              onClick={handleStartNewChat}
              title="Start new conversation"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={css.actionIcon}>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <button
              className={css.actionButton}
              onClick={handleToggle}
              title="Minimize chat"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={css.actionIcon}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={css.chatMessages} ref={containerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={classNames(css.message, {
                [css.userMessage]: message.role === 'user',
                [css.assistantMessage]: message.role === 'assistant',
              })}
            >
              <div className={css.messageContent}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isSending && (
            <div className={classNames(css.message, css.assistantMessage)}>
              <div className={css.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className={css.chatInput}>
          <div className={css.inputWrapper}>
            <textarea
              ref={inputRef}
              className={css.textarea}
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows="1"
              disabled={isSending}
            />
            <button
              className={classNames(css.sendButton, { [css.sending]: isSending })}
              onClick={sendMessage}
              disabled={!input.trim() || isSending}
              title="Send message"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={css.sendIcon}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FloatingChatBubble.defaultProps = {
  isOpen: false,
  isMinimized: true,
};

FloatingChatBubble.propTypes = {
  isOpen: bool,
  onToggle: bool,
  className: string,
  rootClassName: string,
};

export default FloatingChatBubble;
