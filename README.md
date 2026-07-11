# Verse Study Quiz — Standalone p5.js/PWA

This project converts the Khan Academy/ProcessingJS quiz into a regular p5.js
website while preserving the original study sets and quiz logic.

## Project structure

```text
p5_quiz_project/
├── .nojekyll
├── index.html
├── style.css
├── sketch.js
├── manifest.webmanifest
├── service-worker.js
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── libraries/
    ├── README.txt
    └── p5.min.js          <-- copy this file here
```

`p5.sound.min.js` is not required because this quiz does not use sound.

## 1. Add p5.js

Download the official minified p5.js file and place it at:

```text
libraries/p5.min.js
```

The path must match exactly because `index.html` and `service-worker.js` both
refer to that location.

## 2. Test locally

Do not open `index.html` directly with a `file://` URL. Start a local web server
from the project folder instead. For example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 3. Deploy with GitHub Pages

1. Put every file in this project into a GitHub repository.
2. Open the repository's **Settings**.
3. Open **Pages**.
4. Select **Deploy from a branch**.
5. Select your main branch and the root folder.
6. Save and open the generated GitHub Pages address.

All paths are relative, so this works whether the site is hosted at a root
domain or under a repository path such as `/verse-quiz/`.

## 4. Install on iPhone for offline use

1. Open the GitHub Pages site in Safari while online.
2. Use the quiz once so all files can be cached.
3. Tap **Share**.
4. Tap **Add to Home Screen**.
5. Open the new Home Screen app once while online.
6. It should then reopen from the service-worker cache when offline.

The first visit must be online because the browser still needs to download the
app files before they can be cached.

## Updating the app

When you change `sketch.js` or another cached file, update the cache name near
the top of `service-worker.js`:

```javascript
const CACHE_NAME = "verse-quiz-v2";
```

Increase the version each time you deploy important changes. This causes the
new service worker to replace the previous cache.

## Important conversion changes

- Added a normal p5 `setup()` function with `createCanvas(600, 500)`.
- Kept the original 600×500 logical coordinate system and responsive CSS.
- Added small compatibility aliases for ProcessingJS names such as
  `pushMatrix()`, `popMatrix()`, and `createFont()`.
- Moved p5 color creation into `setup()`.
- Replaced the Khan Academy document workaround with normal browser DOM code.
- Added `touchStarted()` input handling so iOS focuses the keyboard during the
  actual touch event.
- Prevented duplicate keyboard input when the hidden iOS input is focused.
- Normalized browser Enter (`keyCode` 13) to the quiz's original Enter handling.
- Preserved the complete `studySetSet` block exactly.
