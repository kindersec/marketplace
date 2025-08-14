import React, { useState } from 'react';

import { Page, LayoutSingleColumn } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import css from './ContactPage.module.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus({ type: 'error', message: 'Sorry, something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page title="Contact" description="Send us a message" scrollingDisabled={false}>
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.container}>
            <h1 className={css.title}>Contact Us</h1>
            <p className={css.subtitle}>Have a question about smart home devices or orders? Send us a message.</p>

            <form className={css.form} onSubmit={onSubmit} noValidate>
              <div className={css.fieldRow}>
                <label className={css.label} htmlFor="name">Name</label>
                <input
                  id="name"
                  className={css.input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={css.fieldRow}>
                <label className={css.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  className={css.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className={css.fieldRow}>
                <label className={css.label} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  className={css.input}
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className={css.fieldRow}>
                <label className={css.label} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className={css.textarea}
                  name="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="Write your message here..."
                  rows={6}
                />
              </div>

              {status ? (
                <div className={status.type === 'success' ? css.success : css.error}>{status.message}</div>
              ) : null}

              <button className={css.submit} type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default ContactPage;


