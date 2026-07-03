// ============================================================
//  Design System App — app.js
// ============================================================

// ── Sidebar navigation ───────────────────────────────────────
const sidebar   = document.getElementById('sidebar');
const mainEl    = document.getElementById('main');
const toggleBtn = document.getElementById('sidebarToggle');
const mobileBtn = document.getElementById('mobileMenu');
const toast     = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
const breadcrumb = document.getElementById('breadcrumb');

let toastTimer;

function showToast(msg = 'Copiado al portapapeles') {
  toastText.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text).then(() => showToast(msg || text));
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  mainEl.classList.toggle('collapsed');
});

mobileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebar.classList.toggle('mobile-open');
});

// Close mobile sidebar when clicking outside
document.addEventListener('click', e => {
  if (window.innerWidth <= 768 && 
      sidebar.classList.contains('mobile-open') &&
      !sidebar.contains(e.target)) {
    sidebar.classList.remove('mobile-open');
  }
});

// ── Page routing ─────────────────────────────────────────────
const pages = { tokens: 'page-tokens', colors: 'page-colors', typography: 'page-typography', components: 'page-components', icons: 'page-icons', grid: 'page-grid', logos: 'page-logos' };
const nav_labels = { tokens: 'Tokens de Diseño', colors: 'Colores', typography: 'Tipografía', components: 'Componentes', icons: 'Iconos', grid: 'Sistema Grid', logos: 'Logotipos' };

let currentPage = 'tokens';

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(pages[page]).classList.remove('hidden');
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  breadcrumb.textContent = nav_labels[page] || page;
  currentPage = page;
  
  // En móviles, NO cerramos el sidebar si el elemento tiene submenú.
  // Solo lo cerramos si es un link que no genera dropdown.
  if (window.innerWidth <= 768) {
    const submenu = navEl ? navEl.nextElementSibling : null;
    const hasSubmenu = submenu && submenu.classList.contains('nav-submenu') && submenu.children.length > 0;
    if (!hasSubmenu) {
      sidebar.classList.remove('mobile-open');
    }
  }
}

// ... Skipping other methods via string replace to keep size small
// Doing replacement chunks further down where possible but for init we do this:


document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => { e.preventDefault(); navigateTo(item.dataset.page); });
});

document.getElementById('copyAllBtn').addEventListener('click', () => {
  const tokensData = JSON.stringify(buildTokensExport(), null, 2);
  copyToClipboard(tokensData, 'Tokens exportados al portapapeles');
});

// ── Token data (extracted from design-sistem-master.json) ────
const PRIMITIVE_COLORS = {
  violeta: { 50:'#E8E0FB', 100:'#D0C1F6', 200:'#B9A3F2', 300:'#A184EE', 400:'#7246E5', 500:'#7246E5', 600:'#4F1DD2', 700:'#3C169D', 800:'#140734', 900:'#140734' },
  azul:    { 50:'#CCDDF7', 100:'#9ABBF0', 200:'#6799E8', 300:'#3477E0', 400:'#1D5BBE', 500:'#15438B', 600:'#11366F', 700:'#0D2853', 800:'#081B38', 900:'#040D1C' },
  neutro:  { 50:'#F4F6F9', 100:'#EAEDF2', 200:'#E0E4EB', 300:'#D5DBE5', 400:'#CBD2DF', 500:'#C0C9D8', 600:'#8E9EB9', 700:'#5E7397', 800:'#3E4D65', 900:'#1F2632' },
  turquesa:{ 50:'#D2FFFD', 100:'#A5FFFB', 200:'#78FFF9', 300:'#4BFFF8', 400:'#1EFFF6', 500:'#00F0E6', 600:'#00C0B8', 700:'#00908A', 800:'#00605C', 900:'#00302E' },
  warning: { 50:'#FFF5D6', 100:'#FFEAAC', 200:'#FFE083', 300:'#FFD65A', 400:'#FFCB30', 500:'#FFC107', 600:'#D29D00', 700:'#A07500', 800:'#6E4F00', 900:'#3C2A00' },
  danger:  { 50:'#F9DDE0', 100:'#F3BCC1', 200:'#EE9AA2', 300:'#E87883', 400:'#E25764', 500:'#DC3545', 600:'#BA202F', 700:'#8C1823', 800:'#5D1017', 900:'#2F080C' },
  success: { 50:'#E8F7EB', 100:'#C3EACD', 300:'#5CD878', 500:'#28A745', 700:'#186429', 900:'#0A2E13' }
};

const SEMANTIC_TOKENS = [
  { category: 'Surface', name: 'background',        path: 'color.surface.background.background', hex: '#EAEDF2', desc: 'Fondo principal de la aplicación' },
  { category: 'Surface', name: 'primary',            path: 'color.surface.background.primary',    hex: '#7246E5', desc: 'Fondo de elementos primarios' },
  { category: 'Surface', name: 'secondary',          path: 'color.surface.background.secondary',  hex: '#1F2632', desc: 'Fondo de elementos secundarios' },
  { category: 'Surface', name: 'on-button',          path: 'color.surface.button.on-button',      hex: '#7246E5', desc: 'Color de fondo del botón' },
  { category: 'Surface', name: 'on-button hover',    path: 'color.surface.button.on-button hover',hex: '#4F1DD2', desc: 'Color de fondo del botón al hacer hover' },
  { category: 'Surface', name: 'on-button disabled', path: 'color.surface.button.on-button disable', hex: '#E8E0FB', desc: 'Color de fondo del botón deshabilitado' },
  { category: 'Text',    name: 'heading white',      path: 'color.text.heading.white',            hex: '#EAEDF2', desc: 'Texto de encabezado en fondos oscuros' },
  { category: 'Text',    name: 'heading black',      path: 'color.text.heading.black',            hex: '#1F2632', desc: 'Texto de encabezado en fondos claros' },
  { category: 'Text',    name: 'body white',         path: 'color.text.body.white',               hex: '#EAEDF2', desc: 'Cuerpo de texto en fondos oscuros' },
  { category: 'Text',    name: 'body black',         path: 'color.text.body.black',               hex: '#1F2632', desc: 'Cuerpo de texto en fondos claros' },
  { category: 'Text',    name: 'link default',       path: 'color.text.link.default',             hex: '#1D5BBE', desc: 'Color de enlace por defecto' },
  { category: 'Text',    name: 'link hover',         path: 'color.text.link.hover',               hex: '#3477E0', desc: 'Color de enlace al hacer hover' },
  { category: 'Text',    name: 'link active',        path: 'color.text.link.active',              hex: '#6799E8', desc: 'Color de enlace activo' },
  { category: 'States',  name: 'success default',    path: 'color.text.states.succes.default',    hex: '#28A745', desc: 'Color de estado éxito' },
  { category: 'States',  name: 'warning default',    path: 'color.text.states.warning.default',   hex: '#FFC107', desc: 'Color de estado advertencia' },
  { category: 'States',  name: 'danger default',     path: 'color.text.states.danger.default',    hex: '#DC3545', desc: 'Color de estado peligro' },
  { category: 'States',  name: 'info default',       path: 'color.text.states.information.default', hex: '#7246E5', desc: 'Color de estado información' },
  { category: 'Borders', name: 'border hover',       path: 'color.borders.states.hover',          hex: '#3477E0', desc: 'Borde en estado hover' },
  { category: 'Borders', name: 'border active',      path: 'color.borders.states.active',         hex: '#6799E8', desc: 'Borde en estado activo' },
  { category: 'Borders', name: 'border danger',      path: 'color.borders.states.danger.default', hex: '#DC3545', desc: 'Borde en estado de error' },
];

const SIZE_TOKENS = [
  { name: 'none', path: 'size.none', value: '0', desc: 'Sin tamaño / sin espacio' },
  { name: 'xs',   path: 'size.xs',   value: '2px', desc: 'Tamaño extra pequeño' },
  { name: 'sm',   path: 'size.sm',   value: '4px', desc: 'Tamaño pequeño' },
  { name: 'md',   path: 'size.md',   value: '8px', desc: 'Tamaño mediano' },
  { name: 'lg',   path: 'size.lg',   value: '12px', desc: 'Tamaño grande' },
  { name: 'xl',   path: 'size.xl',   value: '16px', desc: 'Tamaño extra grande' },
  { name: '2xl',  path: 'size.2xl',  value: '24px', desc: 'Espaciado 2x grande' },
  { name: '3xl',  path: 'size.3xl',  value: '32px', desc: 'Espaciado 3x grande' },
  { name: '4xl',  path: 'size.4xl',  value: '40px', desc: 'Espaciado 4x grande' },
  { name: '5xl',  path: 'size.5xl',  value: '48px', desc: 'Espaciado 5x grande' },
];

const TYPOGRAPHY_TOKENS = [
  { tag: 'h1', size: 40, weight: 700, family: 'Montserrat', sample: 'La plataforma más potente' },
  { tag: 'h2', size: 32, weight: 700, family: 'Montserrat', sample: 'Diseño y desarrollo' },
  { tag: 'h3', size: 24, weight: 700, family: 'Montserrat', sample: 'Sistema de diseño' },
  { tag: 'h4', size: 20, weight: 700, family: 'Montserrat', sample: 'Tokens y componentes' },
  { tag: 'h5', size: 16, weight: 700, family: 'Montserrat', sample: 'Tipografía consistente' },
  { tag: 'h6', size: 14, weight: 700, family: 'Montserrat', sample: 'Estilo visual uniforme' },
  { tag: 'body-lg', size: 16, weight: 400, family: 'Inter', sample: 'Texto de cuerpo grande para párrafos y descripciones largas del producto.' },
  { tag: 'body',    size: 14, weight: 400, family: 'Inter', sample: 'Texto de cuerpo estándar para contenido principal y formularios.' },
  { tag: 'body-sm', size: 12, weight: 400, family: 'Inter', sample: 'Texto pequeño para hints, metadatos y etiquetas secundarias.' },
  { tag: 'label',   size: 13, weight: 600, family: 'Inter', sample: 'Etiqueta de formulario y categorías de navegación' },
  { tag: 'caption', size: 11, weight: 400, family: 'Inter', sample: 'Texto de caption para fecha, autor y metadata' },
  { tag: 'code',    size: 13, weight: 400, family: 'Courier New', sample: 'const token = "color.violeta.500";' },
];

function buildTokensExport() {
  const out = {};
  SEMANTIC_TOKENS.forEach(t => { out[t.path] = { value: t.hex, type: 'color', description: t.desc }; });
  SIZE_TOKENS.forEach(t => { out[t.path] = { value: t.value, type: 'sizing', description: t.desc }; });
  return out;
}

// ── COLOR helpers ────────────────────────────────────────────
function isDark(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// ── TOKENS PAGE ──────────────────────────────────────────────
function renderTokens() {
  const el = document.getElementById('tokens-content');
  el.innerHTML = '';

  // Semantic color tokens
  const groups = [...new Set(SEMANTIC_TOKENS.map(t => t.category))];
  groups.forEach(cat => {
    const tokens = SEMANTIC_TOKENS.filter(t => t.category === cat);
    el.innerHTML += `<div class="section-header"><h2 class="section-title">${cat}</h2><span class="section-count">${tokens.length} tokens</span></div>`;
    el.innerHTML += `<div class="row g-3">${tokens.map(t => `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3">
        <div class="token-card" onclick="copyToClipboard('${t.path}', 'Token copiado: ${t.path}')">
          <div class="token-swatch" style="background:${t.hex}; ${isDark(t.hex) ? 'border-color:rgba(255,255,255,0.1)' : ''}"></div>
          <div class="token-info">
            <div class="token-name">${t.name}</div>
            <div class="token-path">${t.path}</div>
            <div class="token-value">${t.hex} · ${t.desc}</div>
          </div>
          <div class="copy-hint"><i class="ph ph-copy" style="font-size:16px;"></i></div>
        </div>
      </div>`).join('')}</div>`;
  });

  el.innerHTML += `<div class="section-header" style="margin-top:40px"><h2 class="section-title">Espaciado</h2><span class="section-count">${SIZE_TOKENS.length} tokens</span></div>`;
  el.innerHTML += `<div class="row g-3">${SIZE_TOKENS.map(t => `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <div class="token-card" onclick="copyToClipboard('${t.path}', 'Token copiado: ${t.path}')">
        <div style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:var(--bg-page);border-radius:var(--radius-sm);border:1px solid var(--border-color);">
          <div style="width:${Math.min(parseInt(t.value)||0,36)}px;height:${Math.min(parseInt(t.value)||0,36)}px;background:var(--color-violeta-200);border-radius:3px;min-width:2px;min-height:2px;"></div>
        </div>
        <div class="token-info">
          <div class="token-name">${t.name}</div>
          <div class="token-path">${t.path}</div>
          <div class="token-value">${t.value} · ${t.desc}</div>
        </div>
        <div class="copy-hint"><i class="ph ph-copy" style="font-size:16px;"></i></div>
      </div>
    </div>`).join('')}</div>`;

  el.innerHTML += `<div class="section-header" style="margin-top:40px"><h2 class="section-title">Tipografía</h2><span class="section-count">${TYPOGRAPHY_TOKENS.length} tokens</span></div>`;
  el.innerHTML += `<div class="row g-3">${TYPOGRAPHY_TOKENS.map(t => `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <div class="token-card" onclick="copyToClipboard('type.${t.tag}', 'Token copiado: type.${t.tag}')">
        <div style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:var(--bg-page);border-radius:var(--radius-sm);border:1px solid var(--border-color);font-family:'${t.family}';font-size:18px;font-weight:${t.weight};color:var(--text-primary);flex-shrink:0;">Aa</div>
        <div class="token-info">
          <div class="token-name">${t.tag}</div>
          <div class="token-path">type.${t.tag}</div>
          <div class="token-value">${t.size}px / ${t.weight}</div>
        </div>
        <div class="copy-hint"><i class="ph ph-copy" style="font-size:16px;"></i></div>
      </div>
    </div>`).join('')}</div>`;
}

// ── COLORS PAGE ──────────────────────────────────────────────
function renderColors() {
  const el = document.getElementById('colors-content');
  el.innerHTML = '';

  // Primitive palettes
  el.innerHTML += `<div class="section-header"><h2 class="section-title">Paleta Primitiva</h2><span class="section-count">Colores base del sistema</span></div>`;
  Object.entries(PRIMITIVE_COLORS).forEach(([name, shades]) => {
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    el.innerHTML += `<div class="palette-group">
      <div class="palette-label">${label}</div>
      <div class="row g-2">${Object.entries(shades).map(([step, hex]) => `
        <div class="col-6 col-sm-3 col-md-2 col-lg">
          <div class="color-swatch" onclick="copyToClipboard('${hex}', '${hex} copiado')" title="Copiar ${hex}">
            <div class="swatch-block" style="background:${hex}"></div>
            <div class="swatch-info">
              <div class="swatch-step">${step}</div>
              <div class="swatch-hex">${hex}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  });

  // Semantic colors grid
  el.innerHTML += `<div class="section-header" style="margin-top:40px"><h2 class="section-title">Colores Semánticos</h2><span class="section-count">Tokens de uso contextual</span></div>`;
  const semCats = [...new Set(SEMANTIC_TOKENS.map(t => t.category))];
  semCats.forEach(cat => {
    const tokens = SEMANTIC_TOKENS.filter(t => t.category === cat);
    el.innerHTML += `<h3 style="font-size:13px;font-weight:600;color:var(--text-muted);margin:24px 0 12px;text-transform:uppercase;letter-spacing:.06em;">${cat}</h3>
    <div class="row g-3" style="margin-bottom:32px;">${tokens.map(t => `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="semantic-card" onclick="copyToClipboard('${t.hex}', '${t.hex} copiado')" title="${t.desc}">
          <div class="semantic-block" style="background:${t.hex}"></div>
          <div class="semantic-info">
            <div class="semantic-name">${t.name}</div>
            <div class="semantic-hex">${t.hex}<br><span style="font-family:var(--font-body);font-size:10px;color:var(--text-muted)">${t.desc}</span></div>
          </div>
        </div>
      </div>`).join('')}
    </div>`;
  });
}

// ── TYPOGRAPHY PAGE ──────────────────────────────────────────
function renderTypography() {
  const el = document.getElementById('typography-content');

  const copyIcon = `<i class="ph ph-copy" style="font-size:16px;"></i>`;

  el.innerHTML = `
  <div class="section-header"><h2 class="section-title">Familias tipográficas</h2></div>
  <div class="row g-4 mb-32">
    <div class="col-12 col-md-6">
      <div class="font-card" onclick="copyToClipboard('Montserrat','Montserrat copiado')">
        <div class="font-specimen" style="font-family:'Montserrat'">Montserrat</div>
        <div class="font-name">Montserrat — Headings</div>
        <div class="font-description">Usada para títulos, encabezados y elementos de marca de alto impacto. Pesos: 400, 500, 600, 700, 800.</div>
        <div class="font-chars" style="font-family:'Montserrat'">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%&*()</div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="font-card" onclick="copyToClipboard('Inter','Inter copiado')">
        <div class="font-specimen" style="font-family:'Inter'">Inter</div>
        <div class="font-name">Inter — Body</div>
        <div class="font-description">Diseñada para interfaces digitales. Excelente legibilidad en pantalla. Pesos: 300, 400, 500, 600, 700.</div>
        <div class="font-chars" style="font-family:'Inter'">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%&*()</div>
      </div>
    </div>
  </div>

  <div class="section-header"><h2 class="section-title">Escala tipográfica</h2><span class="section-count">12 estilos</span></div>
  <div class="type-scale mb-32">
    ${TYPOGRAPHY_TOKENS.map(t => `
    <div class="type-row" onclick="copyToClipboard('type.${t.tag}', 'type.${t.tag} copiado')">
      <div class="type-meta">
        <div class="type-tag">${t.tag}</div>
        <div class="type-specs">${t.size}px · ${t.weight}</div>
      </div>
      <div class="type-sample" style="font-family:'${t.family}';font-size:${Math.min(t.size,32)}px;font-weight:${t.weight}">${t.sample}</div>
      <button class="type-copy-btn" title="Copiar token">${copyIcon}</button>
    </div>`).join('')}
  </div>

  <div class="section-header"><h2 class="section-title">Pesos tipográficos</h2></div>
  <div class="row g-3 mb-32">
    ${[{n:'Regular',w:400,v:'400'},{n:'Semi Bold',w:600,v:'600'},{n:'Bold',w:700,v:'700'}].map(fw => `
    <div class="col-12 col-sm-6 col-md-4">
      <div class="weight-card" onclick="copyToClipboard('type.font-weight.${fw.n.toLowerCase().replace(' ','-')}','${fw.n} copiado')">
        <div class="weight-sample" style="font-weight:${fw.w};font-family:'Inter'">Hg Aa Bb</div>
        <div class="weight-name">${fw.n}</div>
        <div class="weight-meta">font-weight: ${fw.w}</div>
      </div>
    </div>`).join('')}
  </div>`;
}

// ── ICONS PAGE ───────────────────────────────────────────────
const PHOSPHOR_ICONS = [
  'house', 'user', 'users', 'envelope-simple', 'bell', 'gear', 
  'magnifying-glass', 'plus', 'x', 'check', 'arrow-right', 'arrow-left',
  'caret-down', 'caret-right', 'caret-up', 'caret-left', 'dots-three', 'dots-three-vertical',
  'download-simple', 'upload-simple', 'trash', 'pencil-simple', 'copy-simple', 'link',
  'folder', 'file-text', 'image', 'video-camera', 'calendar-blank', 'clock',
  'credit-card', 'bank', 'currency-dollar', 'receipt', 'shopping-cart', 'bag',
  'chart-line-up', 'chart-bar', 'info', 'warning-circle', 'check-circle', 'x-circle',
  'lock-key', 'key', 'shield-check', 'power', 'sign-out', 'globe',
  'device-mobile', 'desktop', 'moon', 'sun', 'star', 'heart',
  'paperclip', 'book-open', 'graduation-cap', 'buildings', 'briefcase', 'map-pin'
];

function renderIcons() {
  const el = document.getElementById('icons-content');
  if (!el) return;
  
  el.innerHTML = `
  <div class="section-header">
    <h2 class="section-title">Iconos esenciales</h2>
    <span class="section-count">${PHOSPHOR_ICONS.length} íconos</span>
  </div>
  <div class="row g-3">
    ${PHOSPHOR_ICONS.map(i => `
      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
        <div class="icon-card" onclick="copyToClipboard('<i class=\\'ph ph-${i}\\'></i>', 'Código copiado')">
          <i class="ph ph-${i}"></i>
          <div class="icon-name">${i}</div>
        </div>
      </div>
    `).join('')}
  </div>
  <div class="alert alert-info-violet" style="margin-top: 40px; max-width: 800px;">
    <div class="alert-icon"><i class="ph ph-info"></i></div>
    <div class="alert-content">
      <div class="alert-title">¿Cómo usarlos?</div>
      Simplemente añade la clase <code>ph ph-nombre-del-icono</code> a una etiqueta <code>&lt;i&gt;</code>. Para ver la colección completa (más de 9002 iconos y 6 pesos distintos), visita <a href="https://phosphoricons.com" target="_blank" style="color:var(--color-violeta-600);font-weight:600">phosphoricons.com</a>.
    </div>
  </div>`;
}

// ── GRID DOCS PAGE ───────────────────────────────────────────
function renderGridDocs() {
  const el = document.getElementById('grid-content');
  if (!el) return;
  
  el.innerHTML = `
  <div class="section-header">
    <h2 class="section-title">Breakpoints y Columnas (Responsive)</h2>
    <p class="text-muted mb-24" style="max-width:800px;">
      El grid se divide en 12 fracciones. Usa sintaxis como <code>.col-{breakpoint}-{ancho}</code> para ajustar cuánto miden según la pantalla:<br>
      • <b>nada</b> (móviles por defecto)<br>
      • <b>sm</b> (tablets pequeñas ≥576px)<br>
      • <b>md</b> (tablets/laptops ≥768px)<br>
      • <b>lg</b> (monitores ≥992px)<br>
      • <b>xl</b> (pantallas ultra-anchas ≥1200px)
    </p>
  </div>
  <div class="grid-demo mb-32">
    <div class="row g-3">
      <!-- Ejemplo: Todo el ancho en móvil, Mitad en Tablet, 1/3 en Desktop -->
      <div class="col-12 col-md-6 col-lg-4">
        <div class="grid-box" style="flex-direction:column;gap:6px">
          <span><code>.col-12</code> (Móvil)</span>
          <span><code>.col-md-6</code> (Tablet)</span>
          <span><code>.col-lg-4</code> (Desktop)</span>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="grid-box" style="flex-direction:column;gap:6px">
          <span><code>.col-12</code> (Móvil)</span>
          <span><code>.col-md-6</code> (Tablet)</span>
          <span><code>.col-lg-4</code> (Desktop)</span>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-4">
        <div class="grid-box" style="flex-direction:column;gap:6px">
          <span><code>.col-12</code> (Móvil)</span>
          <span><code>.col-md-12</code> (Tablet full)</span>
          <span><code>.col-lg-4</code> (Desktop)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section-header">
    <h2 class="section-title">Columnas Automáticas (Auto-layout)</h2>
    <p class="text-muted mb-24" style="max-width:800px;">
      Usa la clase básica <code>.col</code> para que todos los elementos compartan el espacio sobrante equitativamente (Flexbox puro). Ideal para listados de elementos del mismo ancho sin matemáticas complejas.
    </p>
  </div>
  <div class="grid-demo mb-32">
    <div class="row g-3 mb-3">
      <div class="col"><div class="grid-box">.col</div></div>
      <div class="col-6"><div class="grid-box">.col-6 (Forza 50% centro)</div></div>
      <div class="col"><div class="grid-box">.col</div></div>
    </div>
    <div class="row g-3">
      <div class="col"><div class="grid-box">.col</div></div>
      <div class="col"><div class="grid-box">.col</div></div>
      <div class="col"><div class="grid-box">.col</div></div>
      <div class="col"><div class="grid-box">.col</div></div>
    </div>
  </div>

  <div class="section-header">
    <h2 class="section-title">Manejo de Espaciados (Gutters)</h2>
    <p class="text-muted mb-24" style="max-width:800px;">
      Controla las separaciones usando clases <code>.g-*</code> (todos), <code>.gx-*</code> (horizontal) o <code>.gy-*</code> (vertical) desde niveles de 0 a 5 aplicadas a la <code>.row</code> padre.
    </p>
  </div>
  <div class="grid-demo mb-32">
    <div class="row gx-1 gy-4">
      <div class="col-6"><div class="grid-box">.gx-1 .gy-4</div></div>
      <div class="col-6"><div class="grid-box">.gx-1 .gy-4</div></div>
      <div class="col-6"><div class="grid-box">.gx-1 .gy-4</div></div>
      <div class="col-6"><div class="grid-box">.gx-1 .gy-4</div></div>
    </div>
  </div>

  <div class="section-header">
    <h2 class="section-title">Alineación Rápida</h2>
  </div>
  <div class="grid-demo mb-32">
    <div class="row align-items-center justify-content-center" style="min-height:100px; background:var(--bg-page); border-radius:var(--radius-sm)">
      <div class="col-4"><div class="grid-box">.align-items-center<br>.justify-content-center</div></div>
    </div>
  </div>
  
  <div class="alert alert-info-violet" style="margin-top: 40px; max-width: 800px;">
    <div class="alert-icon"><i class="ph ph-info"></i></div>
    <div class="alert-content">
      <div class="alert-title">Jerarquía Obligatoria</div>
      El sistema estricto exige envolver todo bajo: <code>Contenedor &gt; .row &gt; .col-* &gt; [Tu Componente Final]</code>.<br>
      Para aprender sobre utilitarismos extra (como offset, order), recurre a los tutoriales de Bootstrap 5.
    </div>
  </div>
  `;
}

// ── COMPONENTS PAGE ──────────────────────────────────────────
function renderComponents() {
  const el = document.getElementById('components-content');

  el.innerHTML = `
  <!-- BUTTONS -->
  <div class="comp-section">
    <div class="comp-section-title">Botones</div>
    <div class="comp-section-desc">Variantes de botones del sistema. Primary para acciones principales, Secondary para acciones alternativas.</div>
    <div class="comp-preview">
      <div class="comp-canvas">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-outline">Outline</button>
        <button class="btn-ghost">Ghost</button>
        <button class="btn-danger">Danger</button>
      </div>
      <div class="comp-canvas">
        <button class="btn-primary btn-sm">Small</button>
        <button class="btn-primary">Default</button>
        <button class="btn-primary btn-lg">Large</button>
        <button class="btn-primary btn-icon"><i class="ph ph-plus" style="font-size:16px;"></i></button>
        <button class="btn-primary" disabled>Disabled</button>
      </div>
      <div class="comp-canvas" style="background:var(--color-neutro-900)">
        <button class="btn-primary">Primary on Dark</button>
        <button class="btn-outline" style="color:#fff;border-color:#fff">Outline on Dark</button>
        <button class="btn-ghost" style="color:rgba(255,255,255,.6)">Ghost on Dark</button>
      </div>
      <div class="comp-label">Buttons — color.surface.button.*</div>
    </div>
  </div>

  <!-- BADGES -->
  <div class="comp-section">
    <div class="comp-section-title">Badges</div>
    <div class="comp-section-desc">Etiquetas de estado y categorización. Usan los colores semánticos del sistema.</div>
    <div class="comp-preview">
      <div class="comp-canvas">
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-info">Info</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-warning">Warning</span>
        <span class="badge badge-danger">Danger</span>
        <span class="badge badge-neutral">Neutral</span>
      </div>
      <div class="comp-label">Badges — color.text.states.*</div>
    </div>
  </div>

  <!-- INPUTS -->
  <div class="comp-section">
    <div class="comp-section-title">Inputs</div>
    <div class="comp-section-desc">Campos de entrada con estados: default, focus, error y success.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;gap:16px;max-width:600px;">
        <div class="input-group">
          <label class="input-label">Nombre completo</label>
          <input class="input" type="text" placeholder="Ej: Alex García">
          <span class="input-hint">Introduce tu nombre como aparece en tu documento.</span>
        </div>
        <div class="input-group">
          <label class="input-label">Email</label>
          <div class="input-icon-wrapper">
            <i class="input-icon ph ph-envelope-simple" style="font-size:16px"></i>
            <input class="input" type="email" value="alex@empresa.com" style="border-color:var(--color-success-500)">
          </div>
        </div>
        <div class="input-group">
          <label class="input-label">Contraseña</label>
          <input class="input error" type="password" value="pass">
          <span class="input-error">La contraseña debe tener al menos 8 caracteres.</span>
        </div>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
          <label class="checkbox-wrapper"><input type="checkbox" class="checkbox" checked><span style="font-size:14px">Recordarme</span></label>
          <label class="checkbox-wrapper"><input type="checkbox" class="checkbox"><span style="font-size:14px">Acepto los términos</span></label>
          <label class="toggle">
            <input type="checkbox" checked>
            <div class="toggle-track"></div>
            <div class="toggle-thumb"></div>
          </label>
          <label style="font-size:14px">Notificaciones</label>
          <select class="select">
            <option>Todos los usuarios</option><option>Solo admins</option><option>Solo viewers</option>
          </select>
        </div>
      </div>
      <div class="comp-label">Form Elements</div>
    </div>
  </div>

  <!-- ALERTS -->
  <div class="comp-section">
    <div class="comp-section-title">Alertas</div>
    <div class="comp-section-desc">Mensajes de estado para informar, advertir o confirmar acciones al usuario.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;gap:10px;max-width:680px;">
        <div class="alert alert-info-violet">
          <div class="alert-icon"><i class="ph ph-info" style="font-size:16px"></i></div>
          <div class="alert-content"><div class="alert-title">Información</div>Tu plan se renovará automáticamente el 15 de abril.</div>
        </div>
        <div class="alert alert-success">
          <div class="alert-icon"><i class="ph ph-check-circle" style="font-size:16px"></i></div>
          <div class="alert-content"><div class="alert-title">¡Guardado!</div>Los cambios se han aplicado correctamente.</div>
        </div>
        <div class="alert alert-warning">
          <div class="alert-icon"><i class="ph ph-warning" style="font-size:16px"></i></div>
          <div class="alert-content"><div class="alert-title">Atención</div>Tu período de prueba termina en 3 días. Actualiza tu plan para continuar.</div>
        </div>
        <div class="alert alert-danger">
          <div class="alert-icon"><i class="ph ph-x-circle" style="font-size:16px"></i></div>
          <div class="alert-content"><div class="alert-title">Error de pago</div>No pudimos procesar tu tarjeta. Verifica los datos de facturación.</div>
        </div>
      </div>
      <div class="comp-label">Alerts — color.text.states.*</div>
    </div>
  </div>

  <!-- STAT CARDS -->
  <div class="comp-section">
    <div class="comp-section-title">Tarjetas de métricas</div>
    <div class="comp-section-desc">Resumen de indicadores clave para dashboards SaaS.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-wrap:wrap;gap:16px;">
        <div class="stat-card violet" style="min-width:180px">
          <div class="stat-label">MRR</div>
          <div class="stat-value">$42.8K</div>
          <div class="stat-change positive">↑ +12.4% este mes</div>
        </div>
        <div class="stat-card blue" style="min-width:180px">
          <div class="stat-label">Usuarios activos</div>
          <div class="stat-value">3,204</div>
          <div class="stat-change positive">↑ +286 este mes</div>
        </div>
        <div class="stat-card teal" style="min-width:180px">
          <div class="stat-label">NPS</div>
          <div class="stat-value">72</div>
          <div class="stat-change positive">↑ +5 puntos</div>
        </div>
        <div class="stat-card danger" style="min-width:180px">
          <div class="stat-label">Churn rate</div>
          <div class="stat-value">2.1%</div>
          <div class="stat-change negative">↑ +0.3% este mes</div>
        </div>
      </div>
      <div class="comp-label">Stat Cards</div>
    </div>
  </div>

  <!-- AVATARS -->
  <div class="comp-section">
    <div class="comp-section-title">Avatares</div>
    <div class="comp-section-desc">Representación visual de usuarios y entidades.</div>
    <div class="comp-preview">
      <div class="comp-canvas">
        <div class="avatar avatar-sm avatar-violet">AG</div>
        <div class="avatar avatar-violet">AG</div>
        <div class="avatar avatar-lg avatar-violet">AG</div>
        <div class="avatar avatar-xl avatar-violet">AG</div>
        <div style="width:1px;height:40px;background:var(--border-color);"></div>
        <div class="avatar avatar-blue">JM</div>
        <div class="avatar avatar-teal">LR</div>
        <div class="avatar" style="background:linear-gradient(135deg,var(--color-warning-400),var(--color-danger-400))">DP</div>
      </div>
      <div class="comp-label">Avatars</div>
    </div>
  </div>

  <!-- TABLE -->
  <div class="comp-section">
    <div class="comp-section-title">Tabla de datos</div>
    <div class="comp-section-desc">Tabla para visualización de listas, usuarios, transacciones y registros.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="padding:0;">
        <div class="table-wrapper" style="width:100%">
          <table class="data-table">
            <thead><tr>
              <th>Usuario</th><th>Plan</th><th>Estado</th><th>MRR</th><th>Último acceso</th><th></th>
            </tr></thead>
            <tbody>
              ${[
                {name:'Alex García', email:'alex@empresa.com', plan:'Pro', status:'active', mrr:'$99', last:'Hoy', avatar:'AG', color:'violet'},
                {name:'Laura Ruiz', email:'laura@startup.io', plan:'Business', status:'active', mrr:'$249', last:'Ayer', avatar:'LR', color:'teal'},
                {name:'Juan Mora', email:'juan@corp.co', plan:'Starter', status:'trial', mrr:'$0', last:'Hace 3 días', avatar:'JM', color:'blue'},
                {name:'Diana Pérez', email:'diana@firma.mx', plan:'Pro', status:'churned', mrr:'$0', last:'Hace 2 sem', avatar:'DP', color:'warning'},
              ].map(u => `<tr>
                <td><div style="display:flex;align-items:center;gap:10px">
                  <div class="avatar avatar-sm avatar-${u.color}">${u.avatar}</div>
                  <div><div style="font-weight:600;font-size:13px">${u.name}</div><div style="font-size:11px;color:var(--text-muted)">${u.email}</div></div>
                </div></td>
                <td><span class="badge badge-neutral">${u.plan}</span></td>
                <td><span class="badge ${u.status==='active'?'badge-success':u.status==='trial'?'badge-warning':'badge-danger'}">${u.status}</span></td>
                <td style="font-weight:600">${u.mrr}</td>
                <td style="color:var(--text-muted);font-size:13px">${u.last}</td>
                <td><button class="btn-ghost btn-sm btn-icon"><i class="ph ph-dots-three" style="font-size:16px"></i></button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="comp-label">Data Table</div>
    </div>
  </div>

  <!-- NOTIFICATION LIST -->
  <div class="comp-section">
    <div class="comp-section-title">Notificaciones</div>
    <div class="comp-section-desc">Lista de notificaciones del sistema con estados leído/no leído.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="padding:0;">
        <div class="notification-list" style="width:100%">
          ${[
            {title:'Nuevo usuario registrado', text:'Laura Ruiz se unió al plan Business.', time:'Hace 5 min', icon:'👤', color:'var(--color-violeta-50)', unread:true},
            {title:'Pago recibido', text:'Se procesó el pago de $249 de Laura Ruiz.', time:'Hace 1 hora', icon:'💳', color:'var(--color-success-50)', unread:true},
            {title:'Error de importación', text:'El archivo CSV tenía un formato incorrecto.', time:'Hace 3 horas', icon:'⚠️', color:'var(--color-danger-50)', unread:false},
            {title:'Actualización disponible', text:'La versión 2.1 de la API ya está disponible.', time:'Ayer', icon:'🚀', color:'var(--color-azul-50)', unread:false},
          ].map(n => `
            <div class="notification-item ${n.unread?'unread':''}">
              <div class="notification-icon" style="background:${n.color}">${n.icon}</div>
              <div class="notification-content">
                <div class="notification-title">${n.title}</div>
                <div class="notification-text">${n.text}</div>
                <div class="notification-time">${n.time}</div>
              </div>
              <div class="notification-dot"></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="comp-label">Notifications</div>
    </div>
  </div>

  <!-- PROGRESS BARS -->
  <div class="comp-section">
    <div class="comp-section-title">Barras de progreso</div>
    <div class="comp-section-desc">Indicadores de avance para métricas y onboarding.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;gap:20px;max-width:600px;">
        ${[
          {name:'Almacenamiento usado', val:72, color:'', pct:'72%'},
          {name:'Usuarios activos',     val:45, color:'blue', pct:'45%'},
          {name:'Onboarding',           val:90, color:'success', pct:'90%'},
          {name:'Límite de API',        val:88, color:'warning', pct:'88%'},
          {name:'Errores del sistema',  val:12, color:'danger', pct:'12%'},
        ].map(p => `
          <div class="progress-wrapper">
            <div class="progress-label">
              <span class="progress-name">${p.name}</span>
              <span class="progress-value">${p.pct}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill ${p.color}" style="width:${p.val}%"></div>
            </div>
          </div>`).join('')}
      </div>
      <div class="comp-label">Progress Bars</div>
    </div>
  </div>

  <!-- TABS -->
  <div class="comp-section">
    <div class="comp-section-title">Tabs de navegación</div>
    <div class="comp-section-desc">Navegación entre secciones dentro de una misma vista.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="gap:24px;flex-direction:column;align-items:flex-start;">
        <div class="tabs">
          <button class="tab active" onclick="activateTab(this,'tabs1')">General</button>
          <button class="tab" onclick="activateTab(this,'tabs1')">Seguridad</button>
          <button class="tab" onclick="activateTab(this,'tabs1')">Notificaciones</button>
          <button class="tab" onclick="activateTab(this,'tabs1')">Billing</button>
        </div>
        <div class="tabs">
          <button class="tab active" onclick="activateTab(this,'tabs2')">Todos</button>
          <button class="tab" onclick="activateTab(this,'tabs2')">Activos</button>
          <button class="tab" onclick="activateTab(this,'tabs2')">Archivados</button>
        </div>
      </div>
      <div class="comp-label">Tabs</div>
    </div>
  </div>

  <!-- DROPDOWN -->
  <div class="comp-section">
    <div class="comp-section-title">Dropdown Menu</div>
    <div class="comp-section-desc">Menú contextual para acciones sobre elementos.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:32px;flex-wrap:wrap;">
        <div class="dropdown-menu">
          <div class="dropdown-item"><i class="ph ph-pencil-simple" style="font-size:16px"></i> Editar</div>
          <div class="dropdown-item"><i class="ph ph-copy" style="font-size:16px"></i> Duplicar</div>
          <div class="dropdown-item"><i class="ph ph-arrow-square-out" style="font-size:16px"></i> Ver proyecto</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item danger"><i class="ph ph-trash" style="font-size:16px"></i> Eliminar</div>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-item"><i class="ph ph-user" style="font-size:16px"></i> Perfil</div>
          <div class="dropdown-item"><i class="ph ph-gear" style="font-size:16px"></i> Configuración</div>
          <div class="dropdown-item"><i class="ph ph-question" style="font-size:16px"></i> Ayuda</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item danger"><i class="ph ph-sign-out" style="font-size:16px"></i> Cerrar sesión</div>
        </div>
      </div>
      <div class="comp-label">Dropdown Menus</div>
    </div>
  </div>

  <!-- PRICING -->
  <div class="comp-section">
    <div class="comp-section-title">Tarjetas de precio</div>
    <div class="comp-section-desc">Componente de pricing para planes SaaS con características y CTA.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:stretch;">
        <div class="row g-4 w-100">
          ${[
            {plan:'Starter', price:'$0', period:'/mes', desc:'Ideal para explorar la plataforma y proyectos personales.', featured:false, feats:['3 proyectos','1 usuario','5 GB almacenamiento','Soporte por email'], cta:'Empezar gratis'},
            {plan:'Pro', price:'$49', period:'/mes', desc:'Para equipos pequeños que quieren crecer más rápido.', featured:true, feats:['Proyectos ilimitados','10 usuarios','100 GB almacenamiento','Soporte prioritario'], cta:'Probar 14 días gratis'},
            {plan:'Business', price:'$149', period:'/mes', desc:'Para organizaciones con necesidades avanzadas.', featured:false, feats:['Todo en Pro','Usuarios ilimitados','500 GB almacenamiento','SSO y roles personalizados'], cta:'Contactar ventas'},
          ].map(p => `
            <div class="col-12 col-md-6 col-xl-4">
              <div class="pricing-card h-100 ${p.featured?'featured':''}">
                ${p.featured?'<div class="pricing-badge">Más popular</div>':''}
                <div class="pricing-plan">${p.plan}</div>
                <div class="pricing-price">${p.price}<small style="font-size:14px;font-weight:400">${p.period}</small></div>
                <div class="pricing-desc">${p.desc}</div>
                <ul class="pricing-features">
                  ${p.feats.map(f => `<li class="pricing-feature"><i class="ph ph-check" style="font-size:16px;color:currentColor;"></i>${f}</li>`).join('')}
                </ul>
                <button class="btn-${p.featured?'primary':'secondary'} w-full" style="width:100%;justify-content:center;margin-top:auto">${p.cta}</button>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div class="comp-label">Pricing Cards</div>
    </div>
  </div>

  <!-- PROFILE & EMPTY STATE -->
  <div class="comp-section">
    <div class="comp-section-title">Perfil de usuario y Estado vacío</div>
    <div class="comp-section-desc">Tarjeta de perfil y estado vacío para listas sin datos.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:24px;flex-wrap:wrap;">
        <div style="width:220px">
          <div class="profile-card">
            <div class="profile-card-bg"></div>
            <div class="profile-avatar-wrapper">
              <div class="profile-avatar">AG</div>
            </div>
            <div class="profile-name">Alex García</div>
            <div class="profile-role">Product Designer · Pro</div>
            <div class="profile-stats">
              <div><div class="profile-stat-value">48</div><div class="profile-stat-label">Proyectos</div></div>
              <div><div class="profile-stat-value">1.2k</div><div class="profile-stat-label">Commits</div></div>
              <div><div class="profile-stat-value">98%</div><div class="profile-stat-label">Score</div></div>
            </div>
          </div>
        </div>
        <div class="empty-state" style="flex:1;min-width:240px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg)">
          <div class="empty-icon">
            <i class="ph ph-folder-open" style="font-size:26px;"></i>
          </div>
          <div class="empty-title">Sin resultados</div>
          <div class="empty-desc">No encontramos registros que coincidan con tu búsqueda. Intenta con otros filtros.</div>
          <button class="btn-primary btn-sm">Limpiar filtros</button>
        </div>
      </div>
      <div class="comp-label">Profile Card & Empty State</div>
    </div>
  </div>

  <!-- MODAL PREVIEW -->
  <div class="comp-section">
    <div class="comp-section-title">Modal / Dialog</div>
    <div class="comp-section-desc">Ventana de confirmación o formulario emergente.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="background:rgba(31,38,50,.08);">
        <div class="modal" style="position:static;max-width:420px;width:100%">
          <div class="modal-header">
            <div class="modal-title">Eliminar proyecto</div>
            <button class="btn-ghost btn-icon btn-sm"><i class="ph ph-x" style="font-size:16px;"></i></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" style="margin-bottom:16px">
              <div class="alert-icon"><i class="ph ph-warning" style="font-size:16px;"></i></div>
              <div class="alert-content">Esta acción no se puede deshacer.</div>
            </div>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.6">¿Estás seguro de que deseas eliminar <strong>Proyecto Alpha</strong>? Se borrarán todos los archivos, comentarios y datos relacionados.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary">Cancelar</button>
            <button class="btn-danger">Eliminar proyecto</button>
          </div>
        </div>
      </div>
      <div class="comp-label">Modal — Confirm Dialog</div>
    </div>
  </div>
  `;
}

// ── Tab helper ───────────────────────────────────────────────
function activateTab(btn, group) {
  const parent = btn.closest('.tabs');
  parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

// ── LOGOS DATA & RENDER ──────────────────────────────────────
const LOGO_METADATA = [
  {
    id: 'esc-gestion',
    title: 'Escudo + Gestión',
    description: 'Versión corporativa principal que une el escudo histórico de la comuna con la marca de la administración vigente.',
    usage: 'Recomendado para papelería institucional oficial, encabezados de sitios web principales y firmas de correo.',
    variants: [
      {
        colorId: 'color',
        title: 'Versión Color (Principal)',
        description: 'Usar sobre fondos claros, neutros o transparentes.',
        previewPath: 'img/logos-sistema-diseño/esc-gestion-color-L-muniquilicura.png',
        bgDefault: 'bg-light-solid',
        sizes: [
          { name: 'S', file: 'esc-gestion-color-S-muniquilicura.png', res: '488x76 px', size: '8.7 KB' },
          { name: 'L', file: 'esc-gestion-color-L-muniquilicura.png', res: '637x99 px', size: '11.7 KB' },
          { name: 'XL', file: 'esc-gestion-color-XL-muniquilicura.png', res: '910x141 px', size: '17.4 KB' }
        ]
      },
      {
        colorId: 'bco',
        title: 'Versión Blanco (Negativo)',
        description: 'Usar únicamente sobre fondos oscuros, fotografías contrastadas o colores institucionales sólidos.',
        previewPath: 'img/logos-sistema-diseño/esc-gestion-bco-L-muniquilicura.png',
        bgDefault: 'bg-azul-500',
        sizes: [
          { name: 'S', file: 'esc-gestion-bco-S-muniquilicura.png', res: '488x76 px', size: '7.4 KB' },
          { name: 'L', file: 'esc-gestion-bco-L-muniquilicura.png', res: '637x99 px', size: '9.9 KB' },
          { name: 'XL', file: 'esc-gestion-bco-XL-muniquilicura.png', res: '910x141 px', size: '14.9 KB' }
        ]
      }
    ]
  },
  {
    id: 'escudo',
    title: 'Escudo Solo',
    description: 'El emblema heráldico tradicional e histórico de la municipalidad, sin texto secundario.',
    usage: 'Reservado exclusivamente para actos solemnes, documentos oficiales del Alcalde/Concejo, decretos y sellos de cera/agua.',
    variants: [
      {
        colorId: 'color',
        title: 'Versión Color',
        description: 'Usar sobre fondos claros o neutros para mantener la heráldica original.',
        previewPath: 'img/logos-sistema-diseño/escudo-color-L-muniquilicura.png',
        bgDefault: 'bg-light-solid',
        sizes: [
          { name: 'S', file: 'escudo-color-S-muniquilicura.png', res: '194x76 px', size: '3.5 KB' },
          { name: 'L', file: 'escudo-color-L-muniquilicura.png', res: '252x99 px', size: '4.8 KB' },
          { name: 'XL', file: 'escudo-color-XL-muniquilicura.png', res: '359x141 px', size: '7.1 KB' }
        ]
      },
      {
        colorId: 'bco',
        title: 'Versión Blanco',
        description: 'Versión en negativo del escudo heráldico para fondos oscuros.',
        previewPath: 'img/logos-sistema-diseño/escudo-bco-L-muniquilicura.png',
        bgDefault: 'bg-azul-500',
        sizes: [
          { name: 'S', file: 'escudo-bco-S-muniquilicura.png', res: '194x76 px', size: '3.1 KB' },
          { name: 'L', file: 'escudo-bco-L-muniquilicura.png', res: '252x99 px', size: '4.2 KB' },
          { name: 'XL', file: 'escudo-bco-XL-muniquilicura.png', res: '359x141 px', size: '6.4 KB' }
        ]
      }
    ]
  },
  {
    id: 'gestion',
    title: 'Marca de Gestión',
    description: 'El logotipo tipográfico simplificado que representa la administración municipal actual.',
    usage: 'Ideal para afiches de eventos vecinales, redes sociales, banners web informativos y campañas municipales dinámicas.',
    variants: [
      {
        colorId: 'color',
        title: 'Versión Color',
        description: 'Logotipo con los colores oficiales de la administración.',
        previewPath: 'img/logos-sistema-diseño/gestion-color-L-muniquilicura.png',
        bgDefault: 'bg-light-solid',
        sizes: [
          { name: 'S', file: 'gestion-color-S-muniquilicura.png', res: '253x76 px', size: '5.0 KB' },
          { name: 'L', file: 'gestion-color-L-muniquilicura.png', res: '330x99 px', size: '6.7 KB' },
          { name: 'XL', file: 'gestion-color-XL-muniquilicura.png', res: '471x141 px', size: '10.0 KB' }
        ]
      },
      {
        colorId: 'bco',
        title: 'Versión Blanco',
        description: 'Logotipo en negativo para aplicaciones en fondos con color corporativo.',
        previewPath: 'img/logos-sistema-diseño/gestion-bco-L-muniquilicura.png',
        bgDefault: 'bg-azul-500',
        sizes: [
          { name: 'S', file: 'gestion-bco-S-muniquilicura.png', res: '253x76 px', size: '4.0 KB' },
          { name: 'L', file: 'gestion-bco-L-muniquilicura.png', res: '330x99 px', size: '5.5 KB' },
          { name: 'XL', file: 'gestion-bco-XL-muniquilicura.png', res: '471x141 px', size: '8.4 KB' }
        ]
      }
    ]
  }
];

function renderLogos() {
  const el = document.getElementById('logos-content');
  if (!el) return;

  let html = `<div class="logo-section-container">`;

  LOGO_METADATA.forEach(section => {
    html += `
      <div class="logo-section" id="section-${section.id}">
        <div class="logo-section-header">
          <h2 class="section-title logo-section-title">${section.title}</h2>
          <p class="logo-section-desc">${section.description}</p>
          <div style="font-size:12.5px; margin-top:8px; color:var(--text-secondary); line-height: 1.5;">
            <strong style="color:var(--text-primary)">Uso correcto:</strong> ${section.usage}
          </div>
        </div>
        
        <div class="logo-grid">
    `;

    section.variants.forEach(variant => {
      const containerId = `preview-${section.id}-${variant.colorId}`;
      const defaultBgClass = variant.bgDefault;
      const isBco = variant.colorId === 'bco';
      const toggleIcon = isBco ? 'ph-sun-dim' : 'ph-moon';
      
      html += `
        <div class="logo-card">
          <div class="logo-card-title">
            <span>${variant.title}</span>
            <span class="text-muted" style="font-weight:normal; font-size:11px; color: var(--text-muted)">PNG Transparente</span>
          </div>
          
          <div class="logo-preview-container ${defaultBgClass}" id="${containerId}">
            <button class="bg-toggle-btn" onclick="toggleLogoBg('${containerId}')" title="Alternar fondo claro/oscuro">
              <i class="ph-bold ${toggleIcon}"></i>
            </button>
            <img src="${variant.previewPath}" alt="${variant.title}" class="logo-preview-img">
          </div>
          
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin: 0;">${variant.description}</p>
          
          <div class="logo-downloads-list">
      `;

      variant.sizes.forEach(size => {
        const fullPath = `./img/logos-sistema-diseño/${size.file}`;
        html += `
          <div class="logo-download-row">
            <div class="logo-size-info">
              <span class="logo-size-badge">${size.name}</span>
              <div>
                <div class="logo-dimensions">${size.res}</div>
                <div class="logo-filesize">${size.size}</div>
              </div>
            </div>
            <div class="logo-actions">
              <button class="btn-secondary btn-sm btn-icon" onclick="copyToClipboard('${fullPath}', 'Ruta copiada al portapapeles')" title="Copiar ruta de archivo para código">
                <i class="ph ph-copy-simple"></i>
              </button>
              <button class="btn-primary btn-sm btn-icon" onclick="downloadLogo('${fullPath}', '${size.file}')" title="Descargar PNG">
                <i class="ph ph-download-simple"></i>
              </button>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `</div>`;
  el.innerHTML = html;
}

window.toggleLogoBg = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const isAzul = container.classList.contains('bg-azul-500');
  const btn = container.querySelector('.bg-toggle-btn i');
  
  if (isAzul) {
    container.classList.remove('bg-azul-500');
    container.classList.add('bg-light-solid');
    if (btn) {
      btn.className = 'ph-bold ph-moon';
    }
  } else {
    container.classList.remove('bg-light-solid');
    container.classList.add('bg-azul-500');
    if (btn) {
      btn.className = 'ph-bold ph-sun-dim';
    }
  }
};

window.downloadLogo = async function(url, filename) {
  if (window.showSaveFilePicker) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'Imagen PNG',
          accept: {
            'image/png': ['.png'],
          },
        }],
      });
      
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      showToast('Archivo guardado exitosamente');
      return;
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
      console.warn('showSaveFilePicker falló o fue cancelado. Usando descarga clásica:', err);
    }
  }
  
  // Fallback to classic link click
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ── Init ─────────────────────────────────────────────────────
renderTokens();
renderColors();
renderTypography();
renderIcons();
renderGridDocs();
renderLogos();
renderComponents();

// ── Submenu builder ──────────────────────────────────────────
window.buildSubmenus = function() {
  const pagesList = ['tokens', 'colors', 'typography', 'icons', 'grid', 'logos', 'components'];
  pagesList.forEach(pageId => {
    const pageEl = document.getElementById('page-' + pageId);
    if (!pageEl) return;
    
    let titles = Array.from(pageEl.querySelectorAll('.section-title, .comp-section-title'));
    const navItem = document.getElementById('nav-' + pageId);
    if (!navItem) return;
    
    let submenu = navItem.nextElementSibling;
    if (!submenu || !submenu.classList.contains('nav-submenu')) {
      submenu = document.createElement('div');
      submenu.className = 'nav-submenu';
      navItem.parentNode.insertBefore(submenu, navItem.nextSibling);
    }
    
    submenu.innerHTML = '';
    if (titles.length === 0) return;
    
    titles.forEach((titleEl, idx) => {
      const sectionEl = titleEl.closest('.comp-section') || titleEl.parentElement;
      if (!sectionEl.id) sectionEl.id = 'sec-' + pageId + '-' + idx;
      
      const link = document.createElement('a');
      link.className = 'nav-submenu-link';
      link.href = '#' + sectionEl.id;
      
      let text = titleEl.textContent.trim();
      text = text.split('—')[0].trim();
      link.textContent = text;
      
      link.onclick = (e) => {
        e.preventDefault();
        const navWasClosed = window.innerWidth <= 768 && sidebar.classList.contains('mobile-open');
        if (navWasClosed) sidebar.classList.remove('mobile-open');
        
        const rect = sectionEl.getBoundingClientRect();
        const topOffset = rect.top + window.scrollY - 80;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      };
      
      submenu.appendChild(link);
    });
  });
};

window.addEventListener('scroll', () => {
  const currentNav = document.querySelector('.nav-item.active');
  if (!currentNav) return;
  const submenu = currentNav.nextElementSibling;
  if (!submenu || !submenu.classList.contains('nav-submenu')) return;
  
  const links = Array.from(submenu.querySelectorAll('.nav-submenu-link'));
  if (links.length === 0) return;
  
  let currentLink = null;
  links.forEach(link => {
    const sectionId = link.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) currentLink = link;
    }
  });
  
  if (!currentLink) currentLink = links[0];
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
     currentLink = links[links.length - 1];
  }
  
  links.forEach(l => l.classList.remove('active'));
  if (currentLink) currentLink.classList.add('active');
}, { passive: true });

navigateTo('tokens');
window.buildSubmenus();
