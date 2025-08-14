const bodyParser = require('body-parser');

// In dev, just log. In prod, you can wire this to a mail service or ticketing system.
// This handler expects JSON input: { name, email, subject, message }
module.exports = [
  bodyParser.json(),
  (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // eslint-disable-next-line no-console
      console.log('Contact form submission:', { name, email, subject, message });

      return res.status(200).json({ ok: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Contact endpoint error', e);
      return res.status(500).json({ error: 'Server error' });
    }
  },
];


