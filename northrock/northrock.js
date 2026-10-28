/* ==========================
   Orgs, bookmarks, engines
   ========================== */

const ORGS = {
  prod:   'https://nrp.lightning.force.com',
  fullsb: 'https://nrp--fullsb.sandbox.lightning.force.com',
};

function orgMenu(base) {
  return [
    ['Setup',               base + '/lightning/setup/SetupOneHome/home'],
    ['Object Manager',      base + '/lightning/setup/ObjectManager/home'],
    ['Flows',               base + '/lightning/setup/Flows/home'],
    ['Deployment Status',   base + '/lightning/setup/DeployStatus/home'],
    ['Developer Console',   base + '/_ui/common/apex/debug/ApexCSIPage'],
  ];
}

// icon: a domain for the favicon lookup, or a local image path. badge: small corner tag.
const BOOKMARKS = [
  { name: 'Salesforce Prod',         url: ORGS.prod + '/lightning/page/home',   icon: 'salesforce.com', menu: orgMenu(ORGS.prod) },
  { name: 'Salesforce Full Sandbox', url: ORGS.fullsb + '/lightning/page/home', icon: 'salesforce.com', badge: 'SB', menu: orgMenu(ORGS.fullsb) },
  { name: 'Zoom Docs',     url: 'https://docs.zoom.us/',                 icon: 'zoom.us' },
  { name: 'Outlook',       url: 'https://outlook.office.com/mail/',      icon: 'outlook.office.com' },
  { name: 'SharePoint',    url: 'https://northrockpartners.sharepoint.com/', icon: 'www.sharepoint.com' },
  { name: 'Asana',         url: 'https://app.asana.com/',                icon: 'asana.com' },
  { name: 'GitHub',        url: 'https://github.com/NorthRock-Partners/edge',icon: 'github.com' },
  { name: 'Text Edit',     url: 'https://benjamin-john.com/text.html',   icon: '../newtab/icons/note.png' },
  { name: 'UKG',           url: 'https://secure6.saashr.com/ta/6186483.login', icon: 'ukg.com' },
  { name: 'Lattice',       url: 'https://northrock.latticehq.com/',      icon: 'lattice.com' },
  { name: 'Black Diamond', url: 'https://login.bdreporting.com/Auth/SignIn',icon: 'blackdiamond.advent.com' },
  { name: 'DocuSign',      url: 'https://app.docusign.com/',             icon: 'docusign.com' },
  { name: 'Formstack',     url: 'https://www.formstack.com/admin',       icon: 'formstack.com' },
  { name: 'ComplianceAlpha', url: 'https://www.compliancealpha.com/',    icon: 'compliancealpha.com' },
  { name: 'MuleSoft',      url: 'https://anypoint.mulesoft.com/',        icon: 'mulesoft.com' },
  { name: 'Own',           url: 'https://app.owndata.com/',              icon: 'owndata.com' },
  { name: '1Password',     url: 'https://my.1password.com/',             icon: '1password.com' },
];

/* ==========
   Rendering
   ========== */

function iconFor(b) {
  const wrap = document.createElement('span');
  wrap.className = 'icon';

  const img = document.createElement('img');
  img.alt = '';
  img.src = b.icon.includes('/')
    ? b.icon
    : 'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(b.icon);
  const useLetter = () => {
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.textContent = b.name.charAt(0);
    img.replaceWith(letter);
  };
  img.onerror = useLetter;
  // Google answers an unknown domain with a 16px generic globe; a letter tile reads better.
  img.onload = () => { if (!b.icon.includes('/') && img.naturalWidth <= 16) useLetter(); };
  if (b.icon.includes('/')) wrap.classList.add('local');
  wrap.appendChild(img);

  if (b.badge) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = b.badge;
    wrap.appendChild(badge);
  }
  return wrap;
}

function renderBookmarks() {
  const nav = document.getElementById('bookmarks');
  BOOKMARKS.forEach(b => {
    const tile = document.createElement('div');
    tile.className = 'tile';

    const a = document.createElement('a');
    a.href = b.url;
    a.title = b.name;
    a.appendChild(iconFor(b));
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = b.name;
    a.appendChild(label);
    tile.appendChild(a);

    if (b.menu) {
      const menu = document.createElement('div');
      menu.className = 'menu';
      b.menu.forEach(([text, href]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = text;
        menu.appendChild(link);
      });
      tile.appendChild(menu);
    }
    nav.appendChild(tile);
  });
}

/* ===========
   Searching
   =========== */

const $box  = () => document.getElementById('searchBox');
const $hint = () => document.getElementById('hint');
const DEFAULT_HINT = $hint().innerHTML;

// A bare 15/18 character Id, or one pulled out of a pasted Salesforce URL
// (Lightning /lightning/r/Object/Id/view, /lightning/r/Id/view, or Classic /Id).
function findRecordId(text) {
  const t = text.trim();
  const fromUrl = t.match(/force\.com\/(?:lightning\/r\/(?:\w+\/)?)?([a-zA-Z0-9]{15}(?:[a-zA-Z0-9]{3})?)(?=[\/?#]|$)/);
  if (fromUrl) return fromUrl[1];
  if (/^[a-zA-Z0-9]{15}(?:[a-zA-Z0-9]{3})?$/.test(t) && /\d/.test(t)) return t;
  return null;
}

function salesforceUrl(org, text) {
  const base = ORGS[org];
  const id = findRecordId(text);
  if (id) return base + '/lightning/r/' + id + '/view';
  if (!text.trim()) return base + '/lightning/page/home';

  const term = text.trim();
  const search = {
    componentDef: 'forceSearch:search',
    attributes: {
      term: term,
      scopeMap: { type: 'TOP_RESULTS' },
      context: { disableSpellCorrection: false, SEARCH_ACTIVITY: { term: term } },
    },
  };
  const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(search))));
  return base + '/one/one.app#' + encoded;
}

function googleUrl(text) {
  const t = text.trim();
  if (/^https?:\/\/\S+$/i.test(t)) return t;
  if (/^[\w-]+(\.[\w-]+)*\.[a-z]{2,}(:\d+)?(\/\S*)?$/i.test(t)) return 'https://' + t;
  return 'https://www.google.com/search?q=' + encodeURIComponent(t);
}

function claudeUrl(text) {
  const t = text.trim();
  return t ? 'https://claude.ai/new?q=' + encodeURIComponent(t) : 'https://claude.ai/new';
}

function urlFor(engine, text) {
  switch (engine) {
    case 'prod':
    case 'fullsb': return salesforceUrl(engine, text);
    case 'claude': return claudeUrl(text);
    default:       return googleUrl(text);
  }
}

function go(url, newTab) {
  if (newTab) window.open(url, '_blank');
  else window.location.href = url;
}

// Arithmetic only (digits and operators), so nothing else is ever evaluated.
function tryCalc(text) {
  const t = text.trim();
  if (!/^[\d\s.+\-*/()%^]+$/.test(t) || !/\d\s*[+\-*/%^]\s*[\d(]/.test(t)) return false;
  try {
    const result = Function('"use strict"; return (' + t.replace(/\^/g, '**') + ')')();
    if (typeof result !== 'number' || !isFinite(result)) return false;
    $box().value = String(Math.round(result * 1e10) / 1e10);
    $box().select();
    return true;
  } catch {
    return false;
  }
}

function updateHint() {
  const id = findRecordId($box().value);
  $box().classList.toggle('is-id', !!id);
  $hint().innerHTML = id
    ? '<strong>Salesforce Id ' + id + '</strong> &middot; Enter opens it in Prod, Option+Enter in Full Sandbox'
    : DEFAULT_HINT;
}

/* ========
   Wiring
   ======== */

renderBookmarks();

document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', e => {
    go(urlFor(btn.dataset.engine, $box().value), e.metaKey || e.ctrlKey);
  });
});

$box().addEventListener('input', updateHint);

$box().addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  const text = $box().value;
  const newTab = e.metaKey || e.ctrlKey;

  if (e.altKey)   return go(urlFor('fullsb', text), newTab);
  if (e.shiftKey) return go(urlFor('prod', text), newTab);
  if (findRecordId(text)) return go(urlFor('prod', text), newTab);
  if (tryCalc(text)) return;
  go(urlFor('google', text), newTab);
});

// Typing anywhere on the page lands in the search box.
document.addEventListener('keydown', e => {
  if (document.activeElement === $box() || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key.length === 1) $box().focus();
});

window.addEventListener('pageshow', () => { $box().focus(); updateHint(); });
