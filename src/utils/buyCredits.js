const CREDIT_PERSONAL_SHORT_WPID = 364;
const CREDIT_PERSONAL_LONG_WPID  = 365;

const baseUrl = 'https://www.bios-naturshop.eu';
const loginUri = `${baseUrl}/?remote_login=true`;

function addToCart(ids, wpAccessToken, windowToken) {
  const redirectUri = encodeURIComponent(`${baseUrl}/warenkorb/?add_to_cart_multiple=${ids}`);
  const url = `${loginUri}&window_token=${windowToken}&access_token=${wpAccessToken}&redirect_uri=${redirectUri}`;
  const win = window.open(url, '_blank');
  win.focus();
}

export default function buyCredits(personalShorts = 0, personalLongs = 0, wpAccessToken, windowToken) {
  const idsPersonalShrots = Array(parseInt(personalShorts, 10)).fill(CREDIT_PERSONAL_SHORT_WPID).join(',');
  const idsPersonalLongs = Array(parseInt(personalLongs, 10)).fill(CREDIT_PERSONAL_LONG_WPID).join(',');
  const ids = [];

  if (idsPersonalShrots) {
    ids.push(idsPersonalShrots);
  }
  if (idsPersonalLongs) {
    ids.push(idsPersonalLongs);
  }

  addToCart(encodeURIComponent(ids.join(',')), wpAccessToken, windowToken)
}
