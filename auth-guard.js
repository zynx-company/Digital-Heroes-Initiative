// ============================================================
// auth-guard.js
// Reusable login gate for any page that should require a
// signed-in student (e.g. virtual-sessions.html, practical-sessions.html).
//
// Usage on a protected page:
//   <div id="lockScreen"> ... shown while logged out ... </div>
//   <div id="protectedContent" style="display:none"> ... real content ... </div>
//   <script type="module">
//     import { requireLogin } from "./auth-guard.js";
//     requireLogin(() => { /* runs once we know the user IS logged in */ });
//   </script>
// ============================================================

import { watchAuthState } from "./firebase-app.js";

export function requireLogin(onSignedIn) {
  const lockScreen = document.getElementById('lockScreen');
  const protectedContent = document.getElementById('protectedContent');

  watchAuthState((user) => {
    if (user) {
      if (lockScreen) lockScreen.style.display = 'none';
      if (protectedContent) protectedContent.style.display = '';
      if (typeof onSignedIn === 'function') onSignedIn(user);
    } else {
      if (lockScreen) lockScreen.style.display = '';
      if (protectedContent) protectedContent.style.display = 'none';
    }
  });
}
