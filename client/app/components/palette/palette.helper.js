/* globals Color */
import namedColors from 'color-name-list';
import a11yColor from 'a11ycolor';

import { safeFun } from '../../utils/browser';
import colorNameToHex from './colorNameToHex';

const lowerCase = s => s.toLowerCase();

const stripSpaces = s => s.replace(/\s/g, '');

export const stripSemiColonFromValue = v => v.replace(/;/g, '').trim();

/**
 * Reads a name, assumed to be of a color.
 * It first checks the more acurate w3colors list of colors in terms of hex values;
 * If nothing found moves on to the color-name-list package for more exotic names and as
 * verified not so acurate hex values. Otherwise it just dumps the input/color out.
 * @param {string} c The color name
 */
const hexColor = c => {
  // check the 'w3colors.js' list first
  const cToHex = colorNameToHex(c);
  if (cToHex) return cToHex;

  // then check for hex values in the 'color-name-list'
  if (!c.startsWith('#')) {
    const hexOfNamed = namedColors.find(
      color => lowerCase(color.name) === lowerCase(c)
      || stripSpaces(lowerCase(color.name))
      === stripSpaces(lowerCase(c))
    );
    return hexOfNamed && hexOfNamed.hex || '';
  }

  // if nada, just return the color
  return c;
};

/**
 * Math.floor with precision
 * from https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js
 */
function floor(number, decimals) {
  const dec = +decimals || 0;
  const multiplier = Math.pow(10, dec);
  return Math.floor(number * multiplier) / multiplier;
}

/**
 * Contrast validation follows WCAG 2.0 for text.
 * Contrast ratio is calculated by 'ac-colors'
 * @see https://github.com/vinaypillai/ac-colors#colorcontrastratio
 * More at https://webaim.org/resources/contrastchecker/
 * @param {string} fg The foreground color
 * @param {string} bg The background color
 * @param {string} size The size of the foreground text
 * @param {string} weight The weight of the foreground text
 * @param {function} done Runs on success
 */
export function getContrastRatio(fg, bg, size, weight, done) {
  const _done = safeFun(done);
  let fgColor;
  let bgColor;

  try {
    fgColor = new Color({ color: hexColor(fg), type: 'hex' });
    bgColor = new Color({ color: hexColor(bg), type: 'hex' });
    const colorContrast = floor(Color.contrastRatio(fgColor, bgColor), 2);
    const _s = size && Number(size.split('px')[0]) || 0;

    // Lets consider a weight of 500 and up to be bold text
    // and less than 500 to be normal text
    const boldWeight = weight >= 500;

    // Large text is defined as 14 point (typically 18.66px)
    // and bold or larger, or 18 point (typically 24px) or larger.
    const largeText = boldWeight && _s >= 18.66 && _s < 24 || _s >= 24;

    const wcagGrading = {
      AA: colorContrast >= 4.5,
      AALarge: largeText && colorContrast >= 3.1,
      AAA: colorContrast >= 7.1,
      AAALarge: largeText && colorContrast >= 4.5,
      ratio: colorContrast
    };

    // recomend a color to the user if basic WCAG AA fails
    if (!wcagGrading.AA && !wcagGrading.AALarge) {
      wcagGrading.try = a11yColor(fg, bg);
    }

    _done(wcagGrading);
  } catch (e) {
    _done({
      error: true
    });
  }
}
