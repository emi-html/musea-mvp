window.addEventListener('DOMContentLoaded', function () {
  const OUTLINE_ANIM_MS = 7000; // matches drawText duration
  const FILL_START_MS = 3500;   // fillReveal starts halfway
  const FILL_ANIM_MS = 500;     // matches fillReveal duration
  const EXTRA_PAUSE_MS = 300;   // short pause after fill
  setTimeout(function () {
    window.location.href = 'login.html';
  }, FILL_START_MS + FILL_ANIM_MS + EXTRA_PAUSE_MS);
});


