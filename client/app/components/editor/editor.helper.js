/* globals iconsBucket */

import domtoimage from 'dom-to-image';

import { safeFun, browserStorage } from '../../utils/browser';
import {
  readPack,
  readKeywords
} from '../../utils/helpers';

export {
  readBrandName,
  readPack,
  readKeywords
} from '../../utils/helpers';

export const sansUnit = (v, u) => v && v.split(u)[0] || null;

export const stored = i => browserStorage.get(i);

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

export function domToImg(id, picname, extension, style, done, fail) {
  const { brandStyle, iconStyle } = style;
  const _done = safeFun(done);
  const _fail = safeFun(fail);

  const availableExtensions = {
    png: ['toPng', '.png'],
    jpeg: ['toJpeg', '.jpeg']
  };

  const ext = availableExtensions[extension || 'png'];

  // clone the given node
  const node = document.getElementById(id).cloneNode(true);
  node.id = 'generated-logo--clone';

  // the image
  if (node.firstChild) {
    // does not need to eb dragable here
    node.firstChild.removeAttribute('dragable');
    node.firstChild.setAttribute('width', iconStyle.width || '33%');
    node.firstChild.setAttribute('height', iconStyle.width || '33%');
  }

  // the text
  if (node.children[1]) {
    // does not need to eb dragable here
    node.firstChild.removeAttribute('dragable');
  }

  const logoStyle = document.createElement('style');
  logoStyle.innerText = `
  #generated-logo--clone {
    position: relative;
    width: ${style.width || 400}px;
    height: ${style.height || 400}px;
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

  domtoimage[ext[0]](node, {
    width: style.width || 400,
    height: style.height || 400,
    // must be set, this help chrome not block network calls due to CORS
    cacheBust: true,
    style: {
      textAlign: style.textAlign || 'center'
    }
  })
    .then(dataUrl => {
      downloadImg(dataUrl, picname, ext[1]);
      _done();
    })
    .catch(e => _fail(e));
}

export function downloadImg(dataUrl, picname, ext) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.setAttribute('download', picname + ext);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
