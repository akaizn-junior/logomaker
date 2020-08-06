/* globals iconsBucket */

import domtoimage from 'dom-to-image';

import { safeFun } from '../../utils/browser';
import {
  readPack,
  readKeywords
} from '../../utils/helpers';

export {
  readBrandName,
  readPack,
  readKeywords
} from '../../utils/helpers';

export function readItemIndex(urlQuery) {
  const index = new RegExp(/i=[0-9]+/g).exec(urlQuery);
  const i = index && index[0]
    ? index[0].split('=')[1].replace(/_/g, ' ')
    : 0;
  return Number(i);
}

export function getEditorData(done = () => {}, fail = () => {}) {
  const iconsPack = readPack(location.hash);
  const keywords = readKeywords(location.hash);

  const _done = safeFun(done);
  const _fail = safeFun(fail);

  iconsBucket && iconsBucket
    .getItem(keywords + iconsPack)
    .then(exists => {
      if (exists) {
        _done(exists);
      } else {
        _fail();
      }
    })
    .catch(_fail);
}

export function domToImg(id, picname, style, done, fail) {
  const { brandStyle, iconStyle } = style;
  const _done = safeFun(done);
  const _fail = safeFun(fail);
  const node = document.getElementById(id).cloneNode(true);
  node.id = 'generated-logo--clone';

  const iconElem = node;
  // the image element
  if (iconElem.firstChild.setAttribute) {
    iconElem.firstChild.setAttribute('width', iconStyle.width || '33%');
    iconElem.firstChild.setAttribute('height', iconStyle.width || '33%');
  }

  const logoStyle = document.createElement('style');
  logoStyle.innerText = `
  #generated-logo--clone {
    position: relative;
    width: ${style.width || 400}px;
    height: ${style.height || 400}px;
    outline: 'none';
    border: 'none';
    background: ${style.background || '#ffffff'};
  }

  #generated-logo--clone img {
    position: absolute;
    top: ${iconStyle.top || '40px'};
    left: ${iconStyle.left || '40%'};
  }

  #generated-logo--clone p {
    position: absolute;
    top: ${brandStyle.top || '50%'};
    left: ${brandStyle.left || '40%'};
    color: ${brandStyle.color || '#000000'};
    font-family: ${brandStyle.fontFamily || 'Quicksand, sans-serif'};
    font-weight: ${brandStyle.fontWeight || 'bold'};
    font-size: ${brandStyle.fontSize || '1em'};
  }
  `;
  node.appendChild(logoStyle);

  domtoimage
    .toPng(node, {
      width: style.width || 400,
      height: style.height || 400,
      // must be set, this helps chrome not block network calls due to CORS
      cacheBust: true,
      style: {
        textAlign: style.textAlign || 'center'
      }
    })
    .then(dataUrl => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.setAttribute('download', picname);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      _done();
    })
    .catch(e => _fail(e));
}

export const fontWeightValues = [
  {
    name: 'thin',
    value: 100
  },
  {
    name: 'Extra light',
    value: 200
  },
  {
    name: 'Light',
    value: 300
  },
  {
    name: 'Normal',
    value: 400
  },
  {
    name: 'Medium',
    value: 500
  },
  {
    name: 'Semi bold',
    value: 600
  },
  {
    name: 'Bold',
    value: 700
  },
  {
    name: 'Extra Bold',
    value: 800
  }
];

export const fontFamilyValues = [
  {
    name: 'Arial',
    value: 'Arial, sans-serif'
  },
  {
    name: 'Arial Black',
    value: 'Arial Black, sans-serif'
  },
  {
    name: 'Helvetica',
    value: 'Helvetica, sans-serif'
  },
  {
    name: 'Open Sans',
    value: "'Open Sans', sans-serif"
  },
  {
    name: 'Quicksand',
    value: "'Quicksand', sans-serif"
  },
  {
    name: 'Roboto',
    value: "'Roboto', sans-serif"
  },
  {
    name: 'Verdana',
    value: 'Verdana, sans-serif'
  },
  {
    name: 'Montserrat',
    value: "'Montserrat', sans-serif"
  },
  {
    name: 'Ubuntu',
    value: "'Ubuntu', sans-serif"
  },
  {
    name: 'Playfair',
    value: "'Playfair Display', serif"
  },
  {
    name: 'PT Serif',
    value: "'PT Serif', serif"
  },
  {
    name: 'Times',
    value: 'Times, serif'
  },
  {
    name: 'Times New Roman',
    value: "'Times New Roman', serif"
  },
  {
    name: 'Roboto Mono',
    value: "'Roboto Mono', monospace"
  },
  {
    name: 'Space Mono',
    value: "'Space Mono', monospace"
  },
  {
    name: 'Courier',
    value: 'Courier, monospace'
  },
  {
    name: 'Courier New',
    value: "'Courier New', monospace"
  },
  {
    name: 'Comfortaa',
    value: "'Comfortaa', cursive"
  },
  {
    name: 'Special Elite',
    value: "'Special Elite', cursive"
  },
  {
    name: 'Sniglet',
    value: "'Sniglet', cursive"
  }
];
