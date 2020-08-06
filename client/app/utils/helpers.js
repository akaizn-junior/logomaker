export function readBrandName(urlQuery) {
  const brandName = new RegExp(/b=[a-zA-Z._\-0-9]+/g).exec(urlQuery);
  return brandName && brandName[0]
    ? brandName[0].split('=')[1].replace(/_/g, ' ')
    : '';
}

export function readKeywords(urlQuery) {
  const keywords = new RegExp(/k=[a-zA-Z_\-0-9]+/g).exec(urlQuery);
  return keywords && keywords[0]
    ? keywords[0].split('=')[1].replace(/_/g, ' ')
    : '';
}

export function readPack(urlQuery) {
  const pack = new RegExp(/pack=[0-9]+/g).exec(urlQuery);
  const p = pack && pack[0]
    ? pack[0].split('=')[1]
    : 1;
  return Number(p);
}
