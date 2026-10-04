ZHUYIN FOR ENGLISH SPEAKERS - installable app
=============================================

What is in this folder
  index.html             the whole app (also works on its own if you just open it)
  manifest.webmanifest   tells phones the name, colours and icon
  sw.js                  lets the app open with no internet connection
  icons/                 the app icon in the sizes phones ask for

Put it online (free, about five minutes, using GitHub Pages)
  1. Make a free account at github.com and choose New repository.
     Name it something like "zhuyin" and keep it Public.
  2. Choose "uploading an existing file", then drag in EVERYTHING from this
     folder, including the icons folder. Press Commit changes.
  3. Open the repository's Settings, then Pages. Under "Branch" pick main and
     the / (root) folder, then Save.
  4. After a minute the page shows your address:
       https://YOUR-NAME.github.io/zhuyin/
     Open it to check it works, then send that address to anyone.

Install it on a phone
  iPhone (use Safari):  Share button, then Add to Home Screen.
  Android (use Chrome): the three-dot menu, then Install app.
  It then opens full screen with its own icon, and works offline once it has
  been opened one time online.

Updating it later
  Replace the file on GitHub (open it, choose Upload, or edit in the browser).
  People get the new version the next time they open the app with a connection.
  You do not need to touch sw.js.

Good to know
  - The app only becomes installable from an https address. Sending these files
    over WhatsApp or email will not install anything; send the web address.
  - Sound comes from each phone's built-in voice, so it varies between devices
    and needs a Chinese (Taiwan) voice installed. Offline, the voices on the
    phone are used, so what you hear offline matches what you hear online.
  - Progress is saved on the phone it was earned on. It is not shared between
    devices.
  - The fonts load from Google the first time and are then kept for offline use.
