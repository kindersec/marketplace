import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { chatSupport } from '../../util/api';
import { Page, LayoutSingleColumn, SuggestionChip, SuggestionChipContainer } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './ChatSupportPage.module.css';

const scrollToBottom = containerRef => {
  if (containerRef?.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
};

const ChatSupportPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m SmartHome Support. How can I help with your smart home today?' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    scrollToBottom(containerRef);
  }, [messages, suggestions]);

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
      // e may contain server-provided fields via util/api.js request error handling
      const serverMsg = e?.error || e?.message || 'Unexpected error';
      // Also log for developers
      // eslint-disable-next-line no-console
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

  const handleInputFocus = () => {
    setSuggestions([]);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
    if (e.target.value.trim() && suggestions.length > 0) {
      setSuggestions([]);
    }
  };

  // Render suggestion chips for pages and listings
  const renderSuggestions = () => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
      <div className={`${css.message} ${css.assistant}`}>
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
    <Page
      title="Chat Support"
      description="Get expert help with your smart home setup, troubleshooting, and automation questions."
      robots="noindex, nofollow"
      scrollingDisabled={false}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <div className={css.header}>
              <h1 className={css.title}>Chat Support</h1>
              <p className={css.subtitle}>
                Get instant help from our AI assistant for all your smart home questions
              </p>
            </div>

            <div className={css.chatSection}>
              <div className={css.chatContainer} ref={containerRef}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`${css.message} ${m.role === 'assistant' ? css.assistant : ''}`}>
                    <div className={css.messageContent}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className={`${css.message} ${css.assistant}`}>
                    <div className={css.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                {renderSuggestions()}
              </div>

              <div className={css.inputContainer}>
                <textarea
                  className={css.textarea}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  onFocus={handleInputFocus}
                  placeholder="Ask about setup, troubleshooting, Wi‑Fi, automations, compatibility…"
                  rows={3}
                />
                <button
                  className={css.sendButton}
                  onClick={sendMessage}
                  disabled={isSending || !input.trim()}
                >
                  {isSending ? 'Sending…' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ChatSupportPage;


