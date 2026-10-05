SCHOLAR LINK — FINAL WEBSITE
============================

Included:
- Responsive HTML landing page
- Premium blue/gold design
- China-first positioning
- Scholarships: partial + fully funded
- Student visa X1/X2 detailed 8-step process
- Business visa M detailed 6-step process
- University showcase
- China Business section
- France & Türkiye: student and visitor visa steps (country tabs, "Start my application" buttons pre-fill the form)
- Tourism destinations: Zanzibar, Dubai, Seychelles, Thailand, Mauritius, Senegal
- Scroll reveal animations
- Hover animations
- Mobile navigation
- WhatsApp contact form

IMPORTANT BEFORE PRODUCTION
1. WhatsApp number is +237 6 97 36 32 10 (floating button in index.html, WHATSAPP_NUMBER in js/script.js).
2. Replace the placeholder phone number and verify the contact email.
3. Replace remote demo images with your own licensed images where possible.
4. Verify current Chinese, French and Turkish visa requirements, fees, timelines and university scholarship
   conditions before publishing (France: Campus France / France-Visas; Türkiye: e-Visa eligibility by nationality).
5. The site is informational; final visa decisions are made by the relevant authorities.
6. Contact form: each request opens WhatsApp AND is saved by email to scholarlinkconsulting720@gmail.com
   through FormSubmit (LEADS_ENDPOINT in js/script.js). The very first submission sends an
   "Activate Form" email to that inbox: click it once, otherwise requests are not delivered.
   To use a CRM/backend instead, point LEADS_ENDPOINT to it.
7. Icons and flags are inline SVG (Lucide, ISC license; WhatsApp glyph from Simple Icons, CC0) at the top of index.html.

LOGO
img/scholarlink-logo.png (header) and img/scholarlink-logo-light.png (dark footer) are transparent, cropped
versions of the original WhatsApp logo image.

LANGUAGES (FR / EN)
- The flag switcher in the header changes the language; the choice is saved in localStorage.
  A link can force a language with ?lang=en or ?lang=fr; otherwise the browser language is used (French by default).
- French text lives in index.html. Each translated element has data-i18n="key" (attributes: data-i18n-placeholder,
  data-i18n-aria-label, data-i18n-label, data-i18n-content) and its English text is in js/i18n.js under the same key.
- When you add or change French text in index.html, add or update its English entry in js/i18n.js.
- Form leads are always saved with the French service name plus the visitor's language (Langue).
