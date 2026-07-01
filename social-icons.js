// Shared social icons — injects real SVG icon buttons into any
// element with id="socialRow". Keeping this in one file means every
// page's footer stays visually consistent automatically.

(function(){
  const icons = {
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.2v13.7c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7c0-1.5 1.2-2.7 2.7-2.7.3 0 .6 0 .9.1V9.8c-.3 0-.6-.1-.9-.1-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V8.3c1.2.9 2.7 1.4 4.3 1.4V6.5c-2.4 0-4.2-1.9-4.2-4.5z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5L2.7 11.8c-1 .4-1 1 .1 1.3l4.8 1.5 1.8 5.8c.2.7.4.7.9.3l2.6-2.4 4.9 3.6c.6.4 1 .2 1.2-.5L22 5.4c.2-1-.3-1.4-1.1-.9z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.6c0-1.7-1.3-3-3-3.1-2.5-.2-9.5-.2-12 0-1.7.1-3 1.4-3 3.1-.2 2.3-.2 4.8 0 7.1.1 1.7 1.3 3 3 3.1 2.5.2 9.5.2 12 0 1.7-.1 3-1.4 3-3.1.2-2.3.2-4.8 0-7.1zM10 15.5v-7l6 3.5z"/></svg>`
  };

  const links = {
    facebook: "https://www.facebook.com/profile.php?id=61590302831223",
    instagram: "https://www.instagram.com/digitalheroesinitiative/",
    tiktok: "https://www.tiktok.com/@digital_heroes0",
    telegram: "https://t.me/digitalheroesegypt",
    youtube: "https://www.youtube.com/@DigitalHeroesInitiative"
  };

  function render(targetId){
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = Object.keys(icons).map(key =>
      `<a href="${links[key]}" class="social-icon" aria-label="${key}" target="_blank" rel="noopener">${icons[key]}</a>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', function(){
    render('socialRow');
  });
})();
