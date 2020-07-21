export function checkDarkMode() {
  if (window.matchMedia) {
    const matchesDarkMode = mode => {
      if (mode.matches) {
        document.body.dataset.theme = 'dark';
      } else {
        document.body.dataset.theme = 'light';
      }
    };

    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchesDarkMode(darkModeMedia);
    darkModeMedia.onchange = e => matchesDarkMode(e);
  }
}

export function toggleDatasetJsOn() {
  document.body.dataset.js = 'on';
}

export function safeFun(fun) {
  return fun && typeof fun === 'function' ? fun : () => {};
}
