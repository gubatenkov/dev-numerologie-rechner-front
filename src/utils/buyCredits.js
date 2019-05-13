
const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;

const baseUrl = 'https://www.bios-naturshop.eu';
const loginUri = `${baseUrl}/?remote_login=true`;

const loadIframe = (productId, wpAccessToken) => {
  return new Promise((resolve) => {
    const ifrm = document.createElement('iframe');
    const id = 'ifrm' + Date.now();
    const redirectUri = `${baseUrl}/warenkorb/?add-to-cart=${productId}`
    ifrm.setAttribute('id', id);
    document.body.appendChild(ifrm);
    ifrm.setAttribute('style', 'display: none;');
    ifrm.setAttribute(
      'src',
      `${loginUri}&access_token=${wpAccessToken}&redirect_uri=${redirectUri}`
    );

    ifrm.onload = () => {
      document.body.removeChild(ifrm);
      resolve();
    }
  });
}

async function addToCart(items) {
  let params;
  while (params = items.pop()) {
    await loadIframe(...params);
  }
  return null;
}

export default function buyCredits(personalShorts, personalLongs, wpAccessToken) {
  const items = [];
  for (let i = 0; i < personalLongs; i++) {
    items.push([CREDIT_PERSONAL_LONG_WPID, wpAccessToken]);
  }
  for (let i = 0; i < personalShorts; i++) {
    items.push([CREDIT_PERSONAL_SHORT_WPID, wpAccessToken]);
  }
  addToCart([...items])
    .then(() => {
      const win = window.open(`${baseUrl}/warenkorb`, '_blank');
      win.focus();
    })
}
