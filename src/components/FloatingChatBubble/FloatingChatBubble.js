import React, { useState, useCallback, useRef, useEffect } from 'react';
import { bool, string, func } from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { chatSupport } from '../../util/api';
import { SuggestionChip, SuggestionChipContainer } from '..';
import css from './FloatingChatBubble.module.css';

const STORAGE_KEYS = {
  messages: 'aiChat.messages',
  minimized: 'aiChat.minimized',
  suggestions: 'aiChat.suggestions',
};

const FloatingChatBubble = ({ isOpen = false, onToggle, className, rootClassName }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m SmartHome Support. How can I help with your smart home today?' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const classes = classNames(rootClassName, className, { [css.open]: !isMinimized });

  // Load persisted chat state on mount
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const storedMessages = window.sessionStorage.getItem(STORAGE_KEYS.messages);
      const storedMinimized = window.sessionStorage.getItem(STORAGE_KEYS.minimized);
      const storedSuggestions = window.sessionStorage.getItem(STORAGE_KEYS.suggestions);

      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
      if (storedMinimized != null) {
        setIsMinimized(storedMinimized === 'true');
      }
      if (storedSuggestions) {
        const parsedSuggestions = JSON.parse(storedSuggestions);
        if (Array.isArray(parsedSuggestions) && parsedSuggestions.length > 0) setSuggestions(parsedSuggestions);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load persisted chat state', e);
    }
  }, []);

  // Persist chat state whenever it changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      window.sessionStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to persist chat messages', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      window.sessionStorage.setItem(STORAGE_KEYS.minimized, String(isMinimized));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to persist chat minimized state', e);
    }
  }, [isMinimized]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (suggestions.length > 0) {
        window.sessionStorage.setItem(STORAGE_KEYS.suggestions, JSON.stringify(suggestions));
      } else {
        window.sessionStorage.removeItem(STORAGE_KEYS.suggestions);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to persist chat suggestions', e);
    }
  }, [suggestions]);

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
        if (res?.suggestedLinks && Array.isArray(res.suggestedLinks)) {
          setSuggestions(res.suggestedLinks);
        } else {
          setSuggestions([]);
        }
      } else if (res?.error) {
        setMessages([
          ...nextMessages,
          { role: 'assistant', content: `Sorry, I couldn't process that: ${res.error}` },
        ]);
        setSuggestions([]);
      } else {
        setMessages([
          ...nextMessages,
          { role: 'assistant', content: 'Sorry, I could not generate a response.' },
        ]);
        setSuggestions([]);
      }
    } catch (e) {
      const serverMsg = e?.error || e?.message || 'Unexpected error';
      console.error('ChatSupport error:', e);
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: `Sorry, I couldn't process that: ${serverMsg}` },
      ]);
      setSuggestions([]);
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
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Render suggestion chips for pages and listings
  const renderSuggestions = () => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
      <div className={classNames(css.message, css.assistantMessage)}>
        <div className={css.messageContent}>
          <div className={css.suggestionsHeader}>
            <span className={css.suggestionsIcon}>💡</span>
            <span className={css.suggestionsText}>Recommended resources:</span>
          </div>
          <SuggestionChipContainer>
            {suggestions.map((suggestion, index) => {
              // Remove leading slash from title for cleaner display
              const displayTitle = suggestion.title.replace(/^\//, '');
              return (
                <SuggestionChip
                  key={`${suggestion.type}-${index}`}
                  label={displayTitle}
                  href={suggestion.url}
                  className={css.suggestionChip}
                />
              );
            })}
          </SuggestionChipContainer>
        </div>
      </div>
    );
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
                <path d="M6 13h12v-2H6v2z"/>
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
          {renderSuggestions()}
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

FloatingChatBubble.propTypes = {
  isOpen: bool,
  onToggle: func,
  className: string,
  rootClassName: string,
};

export default FloatingChatBubble;
