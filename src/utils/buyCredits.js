
const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;

const baseUrl = 'https://www.bios-naturshop.eu';
const loginUri = `${baseUrl}/?remote_login=true`;

function buildUrl(productId, quantity, wpAccessToken, addParams = '') {
  const redirectUri = encodeURIComponent(`${baseUrl}/warenkorb/?add-to-cart=${productId}&quantity=${quantity}`);
  return `${loginUri}${addParams}&access_token=${wpAccessToken}&redirect_uri=${redirectUri}`;
}

const loadIframe = (url) => {
  return new Promise((resolve) => {
    const ifrm = document.createElement('iframe');
    const id = 'ifrm' + Date.now();
    ifrm.setAttribute('id', id);
    document.body.appendChild(ifrm);
    ifrm.setAttribute('style', 'display: none;');
    ifrm.setAttribute(
      'src',
      url
    );

    ifrm.onload = () => {
      document.body.removeChild(ifrm);
      resolve();
    }
  });
}

async function addToCart(items, windowToken) {
  let params;
  while (params = items.pop()) {
    if (items.length === 0) {
      const url = buildUrl(...params, `&window_token=${windowToken}`);
      const win = window.open(url, '_blank');
      win.focus();
    }
    else {
      const url = buildUrl(...params);
      await loadIframe(url);
    }
  }
  return null;
}

export default function buyCredits(personalShorts = 0, personalLongs = 0, wpAccessToken, windowToken) {
  const items = [];
  if (personalShorts > 0) {
    items.push([CREDIT_PERSONAL_LONG_WPID, personalShorts, wpAccessToken]);
  }
  if (personalLongs > 0) {
    items.push([CREDIT_PERSONAL_SHORT_WPID, personalLongs, wpAccessToken]);
  }

  addToCart([...items], windowToken)
    .then(() => {})
}
