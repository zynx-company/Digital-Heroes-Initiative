// ============================================================
// nav-auth.js
// Runs on every page. Watches Firebase auth state and swaps the
// navbar's "Log in / Join free" buttons for a user pill
// (name + green online dot) when someone is logged in.
//
// Usage: just include this script (type="module") on any page
// that has a <div class="navcta" id="navCta"> ... </div> in its nav.
// ============================================================

import { watchAuthState, getStudentProfile, logoutStudent } from "./firebase-app.js";

function initials(name) {
  if (!name) return "S";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "S";
}

function renderLoggedOut(container) {
  container.innerHTML = `
    <a href="login.html" class="btn btn-ghost">Log in</a>
    <a href="signup.html" class="btn btn-primary">Join free</a>
  `;
}

function renderLoggedIn(container, name) {
  container.innerHTML = `
    <a href="#" class="user-pill" id="userPillBtn">
      <span class="pill-avatar">${initials(name)}</span>
      <span class="pill-name">${name || "Student"}</span>
      <span class="pill-status"></span>
    </a>
  `;
  const pill = container.querySelector('#userPillBtn');
  pill.addEventListener('click', async (e) => {
    e.preventDefault();
    if (confirm('Log out of your account?')) {
      await logoutStudent();
      window.location.href = 'index.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const navCta = document.getElementById('navCta');
  if (!navCta) return;

  watchAuthState(async (user) => {
    if (user) {
      let profile = null;
      try { profile = await getStudentProfile(user.uid); } catch (e) { /* ignore */ }
      renderLoggedIn(navCta, profile?.fullName);
    } else {
      renderLoggedOut(navCta);
    }
  });
});
