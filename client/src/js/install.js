const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// hides 'install' button if already installed
function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (navigator.standalone || isStandalone) {
    return butInstall.classList.toggle('hidden', true);
  }
  return 'browser';
}

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = deferredPrompt;
    // Show prompt
    console.log('promptEvent:', promptEvent);
    if (promptEvent === undefined) {
        window.alert("App already installed!");
        butInstall.classList.toggle('hidden', true);
    } else {
        promptEvent.prompt();
        // Reset the deferred prompt variable, it can only be used once.
        deferredPrompt = null;
        butInstall.classList.toggle('hidden', true);
    };
});

// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

getPWADisplayMode();