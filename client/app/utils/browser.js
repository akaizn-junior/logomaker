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

/**
 * Verifies a list of ids that should belong to inputs, then focus the first empty input.
 * Returns false when the first empty input is found, true if all inputs are filled.
 * @param {array} ids The list of ids to verify
 */
export function verifyFilledInputs(ids) {
  for (let i = 0; i < ids.length; i++) {
    const elem = document.getElementById(ids[i]);

    if (elem && elem.localName === 'input' && !elem.value.length) {
      elem.focus();
      return false;
    }

    if (elem && elem.localName === 'div' && !elem.innerText.length) {
      elem.focus();
      return false;
    }
  }

  return true;
}

export const browserStorage = {
  get: k => sessionStorage.getItem(k),
  set: (k, v) => sessionStorage.setItem(k, v)
};

/**
 * Builds a classname based on boolean states
 * @param {{string: boolean}} classesToBuild An object with classnames to append to the default classname.
 * Evaluated by the names boolean state.
 * @param {string} className The default classname to append to, empty is none provided
 */
export function classNameBuilder(classesToBuild, className = '') {
  if (classesToBuild) {
    for (const k in classesToBuild) {
      if (classesToBuild[k]) {
        className = className.length ? className.concat(' ', k) : className.concat(k);
      }
    }
  }

  return className;
}
