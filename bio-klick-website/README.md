# Bio Klick - Marketing Website

Single-page marketing site for Bio Klick (Bio Pages, NFC products and the mobile app).
Static site: plain HTML, CSS and JavaScript. No build step and no external dependencies
other than Google Fonts.

## Project structure

```
index.html            Page markup (all sections, popups and the FAQ overlay)
css/styles.css        Single stylesheet; responsive rules for phones are at the end
js/main.js            All behaviour (one module, commented by section)
assets/img/           Optimised images (WebP, one PNG logo)
assets/img/connections/   Profile photos used in the Connections map
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
```

## Deployment

Upload the folder contents to the root of any static host (Vercel, Netlify, GitHub Pages,
S3 or nginx). Keep the folder layout unchanged; all asset paths are relative.

## Page sections

| Section            | Selector          | Notes                                                    |
| ------------------ | ----------------- | -------------------------------------------------------- |
| Header             | `header`          | Sticky pill, menu and the "Start for free" button         |
| Hero               | `.hero`           | Headline, two buttons, hero image                         |
| Core benefits      | `#features`       | Four cards, each links to its section                     |
| Digital Bio        | `#bio`            | Orbit visual and text                                     |
| Easy Sharing       | `#sharing`        | NFC, QR and link cards                                    |
| Analytics          | `#analytics`      | Dashboard preview: tabs and All-time / 7D / 30D filter    |
| Connections        | `#connections`    | Interactive network map                                   |
| Products           | `#products`       | Horizontal rail with arrows and drag scrolling            |
| Why Switch         | `#business`       | Paper card vs Bio Klick comparison slider                 |
| App download       | `#app`            | Store badges and final call to action                     |
| Footer             | `footer`          | About, social links, legal links, FAQ, Contact us         |

Overlays (hidden by default): download popup `#gm`, FAQ `#fq`, contact popup `#ctm`.

## Configuration points

**Store links and device detection** - `js/main.js`, section "Download buttons".
`UI` is the App Store URL and `UA` is the Google Play URL. Every element with the class
`js-get` (and the store badges) uses them: iOS opens the App Store, Android opens
Google Play, desktop opens the download popup (`#gm`).

**QR codes in the download popup** - static inline SVGs inside `#gm` in `index.html`.
They encode the same two store URLs. If a store URL changes, regenerate both codes with any
QR generator and replace the `<svg>` elements (keep the `viewBox`).

**Contact popup** - `#ctm` in `index.html`. The email row opens a Gmail compose window
with the subject "Bio Klick Website Inquiry" (the `su` parameter in the link, useful for
filtering in Gmail). The WhatsApp row uses `https://wa.me/<number>`.

**Footer links** - Instagram, TikTok, Terms of Service and Privacy Policy are plain anchors
in `footer.ft`.

**Products** - the Basic Card price is the `.price` element. The "Buy Now" button is a
`<button>` with no action yet: add the purchase link or handler there. The Funky Card and
Keychain cards are marked "Coming soon" (`.sn` cards, disabled button).

**Analytics preview** - the numbers are sample data defined in the `DATA` object in
`js/main.js`. Replace them if real figures should be shown.

**Connections map** - people and photos are defined by the `N` and `IM` arrays in
`js/main.js` (same order). Add or remove entries there and keep the photos in
`assets/img/connections/`.

## Design tokens

Declared on `:root` in `css/styles.css`:

| Token     | Value     | Use                                   |
| --------- | --------- | ------------------------------------- |
| `--k`     | `#000000` | Card background                       |
| `--lime`  | `#CCFF33` | Accent, buttons                       |
| `--navy`  | `#0D2440` | Brand navy, gradients                 |
| `--ice`   | `#CAF0F8` | Secondary text and outlines           |
| `--page`  | `#081628` | Page background                       |

Fonts: Montserrat (body) and Barlow Condensed (headings, loaded from Google Fonts).
The heading stack lists Agency FB first, so it is used where installed.

## Behaviour notes

- Scroll reveal: elements with the class `rv` receive `in` when they enter the viewport.
- Reduced motion: animations and transitions are disabled with `prefers-reduced-motion`.
- Popups are keyboard accessible (Esc closes, focus is moved into the dialog).
- The hero image tilt effect was removed on purpose; the image is static.

## Browser support

Current versions of Chrome, Edge, Safari and Firefox. The page uses `backdrop-filter`,
`clip-path`, `aspect-ratio`, CSS custom properties and `:has()` (focus outline only).

## Suggested before launch

- Add a meta description, Open Graph tags and a favicon in `<head>`.
- Add the purchase link for the Basic Card.
- Replace the Sharing section's decorative QR pattern if a real code is preferred
  (it is drawn by script and is not scannable).

## Credits

- Icons for Apple, Instagram, TikTok and WhatsApp: Simple Icons (CC0).
- Fonts: Montserrat and Barlow Condensed (SIL Open Font License) via Google Fonts.
