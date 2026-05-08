// components-extended.js
// Adds new components to the design system page after app.js runs

(function () {
  function addComponents() {
    const el = document.getElementById('components-content');
    if (!el) return;

    const extra = document.createElement('div');
    extra.innerHTML = `

  <!-- TIMELINE VERTICAL -->
  <div class="comp-section">
    <div class="comp-section-title">Timeline — Proceso de Registro y Pago</div>
    <div class="comp-section-desc">Visualización vertical del proceso institucional: registro → verificación → documentación → pago → confirmación.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start">
        <div class="timeline" style="max-width:520px;width:100%">
          <div class="timeline-track">
            <div class="timeline-item completed">
              <div class="timeline-line"></div>
              <div class="timeline-icon-col"><div class="timeline-dot"><i class="ph-bold ph-check" style="font-size:16px;color:currentColor"></i></div></div>
              <div class="timeline-content">
                <div class="timeline-header"><div class="timeline-step-title">Registro de cuenta</div><span class="badge badge-success" style="font-size:10px">Completado</span></div>
                <div class="timeline-desc">El usuario creó su cuenta con email y contraseña. Se envió un email de bienvenida.</div>
                <div class="timeline-meta">✓ Completado el 8 mar 2026 · 10:24 AM</div>
              </div>
            </div>
            <div class="timeline-item completed">
              <div class="timeline-line"></div>
              <div class="timeline-icon-col"><div class="timeline-dot"><i class="ph-bold ph-check" style="font-size:16px;color:currentColor"></i></div></div>
              <div class="timeline-content">
                <div class="timeline-header"><div class="timeline-step-title">Verificación de email</div><span class="badge badge-success" style="font-size:10px">Completado</span></div>
                <div class="timeline-desc">Email verificado exitosamente. La cuenta está activa y el proceso puede continuar.</div>
                <div class="timeline-meta">✓ Completado el 8 mar 2026 · 10:27 AM</div>
              </div>
            </div>
            <div class="timeline-item active">
              <div class="timeline-line"></div>
              <div class="timeline-icon-col"><div class="timeline-dot">3</div></div>
              <div class="timeline-content">
                <div class="timeline-header"><div class="timeline-step-title">Documentación institucional</div><span class="badge badge-info" style="font-size:10px">En curso</span></div>
                <div class="timeline-desc">Se requiere adjuntar: constancia de estudios, identificación oficial y comprobante de domicilio.</div>
                <div class="timeline-card" style="display:flex;gap:12px;flex-wrap:wrap">
                  <span style="font-size:12px;color:var(--color-success-500)">✓ ID Oficial</span>
                  <span style="font-size:12px;color:var(--color-success-500)">✓ Constancia</span>
                  <span style="font-size:12px;color:var(--color-warning-600)">⏳ Comprobante domicilio</span>
                </div>
              </div>
            </div>
            <div class="timeline-item muted">
              <div class="timeline-line"></div>
              <div class="timeline-icon-col"><div class="timeline-dot">4</div></div>
              <div class="timeline-content">
                <div class="timeline-header"><div class="timeline-step-title">Pago de servicios</div><span class="badge badge-neutral" style="font-size:10px">Pendiente</span></div>
                <div class="timeline-desc">Selecciona el servicio y realiza el pago mediante tarjeta, transferencia o OXXO.</div>
              </div>
            </div>
            <div class="timeline-item muted">
              <div class="timeline-icon-col"><div class="timeline-dot">5</div></div>
              <div class="timeline-content">
                <div class="timeline-header"><div class="timeline-step-title">Confirmación y acceso</div><span class="badge badge-neutral" style="font-size:10px">Pendiente</span></div>
                <div class="timeline-desc">Recibirás tu comprobante y acceso al servicio institucional en tu correo registrado.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comp-label">Timeline Vertical — Registro Institucional</div>
    </div>
  </div>

  <!-- TIMELINE HORIZONTAL & STEP INDICATOR -->
  <div class="comp-section">
    <div class="comp-section-title">Timeline Horizontal & Step Indicator</div>
    <div class="comp-section-desc">Vista de pasos compacta para formularios multipaso y asistentes de pago.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;gap:28px;width:100%">
        <div class="timeline-h" style="width:100%;max-width:640px">
          <div class="timeline-h-item completed"><div class="timeline-h-dot"><i class="ph-bold ph-check" style="font-size:14px;color:currentColor"></i></div><div class="timeline-h-label">Registro</div><div class="timeline-h-sub">Completado</div></div>
          <div class="timeline-h-item completed"><div class="timeline-h-dot"><i class="ph-bold ph-check" style="font-size:14px;color:currentColor"></i></div><div class="timeline-h-label">Verificación</div><div class="timeline-h-sub">Completado</div></div>
          <div class="timeline-h-item active"><div class="timeline-h-dot">3</div><div class="timeline-h-label">Documentos</div><div class="timeline-h-sub">En curso</div></div>
          <div class="timeline-h-item"><div class="timeline-h-dot">4</div><div class="timeline-h-label">Pago</div><div class="timeline-h-sub">Pendiente</div></div>
          <div class="timeline-h-item"><div class="timeline-h-dot">5</div><div class="timeline-h-label">Acceso</div><div class="timeline-h-sub">Pendiente</div></div>
        </div>
        <div class="step-indicator" style="max-width:560px">
          <div class="step-item done"><div class="step-num"><i class="ph-bold ph-check" style="font-size:12px;color:currentColor"></i></div><div class="step-label">Datos</div></div>
          <div class="step-item done"><div class="step-num"><i class="ph-bold ph-check" style="font-size:12px;color:currentColor"></i></div><div class="step-label">Documentos</div></div>
          <div class="step-item current"><div class="step-num">3</div><div class="step-label">Pago</div></div>
          <div class="step-item error"><div class="step-num">!</div><div class="step-label">Error</div></div>
          <div class="step-item"><div class="step-num">5</div><div class="step-label">Confirmar</div></div>
        </div>
      </div>
      <div class="comp-label">Horizontal Timeline & Step Indicators</div>
    </div>
  </div>

  <!-- ACCORDION -->
  <div class="comp-section">
    <div class="comp-section-title">Accordion</div>
    <div class="comp-section-desc">Dos variantes: Default (con bordes redondeados) y Flush (solo separadores de línea).</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;gap:24px">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Default</div>
          <div class="accordion">
            <div class="accordion-item open">
              <div class="accordion-header" onclick="toggleAccordion(this)"><span class="accordion-title">¿Qué documentos necesito para inscribirme?</span><i class="accordion-icon ph ph-caret-down" style="font-size:16px;"></i></div>
              <div class="accordion-body"><div class="accordion-body-inner">Necesitas: identificación oficial vigente, comprobante de domicilio reciente (menos de 3 meses), y constancia de estudios o trabajo según el servicio solicitado.</div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" onclick="toggleAccordion(this)"><span class="accordion-title">¿Cuáles son los métodos de pago aceptados?</span><i class="accordion-icon ph ph-caret-down" style="font-size:16px;"></i></div>
              <div class="accordion-body"><div class="accordion-body-inner">Aceptamos tarjeta de crédito/débito (Visa, Mastercard), transferencia bancaria SPEI, y pago en efectivo en tiendas OXXO con referencia generada por el sistema.</div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" onclick="toggleAccordion(this)"><span class="accordion-title">¿En cuánto tiempo se procesa mi registro?</span><i class="accordion-icon ph ph-caret-down" style="font-size:16px;"></i></div>
              <div class="accordion-body"><div class="accordion-body-inner">Una vez completados los documentos y el pago, tu acceso se activa en un plazo de 24 a 48 horas hábiles. Recibirás una notificación por email.</div></div>
            </div>
          </div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Flush</div>
          <div class="accordion flush">
            <div class="accordion-item open">
              <div class="accordion-header" onclick="toggleAccordion(this)"><span class="accordion-title">¿Puedo cancelar mi servicio?</span><i class="accordion-icon ph ph-caret-down" style="font-size:16px;"></i></div>
              <div class="accordion-body"><div class="accordion-body-inner">Sí, puedes cancelar dentro de los primeros 7 días naturales y recibirás un reembolso completo. Después de ese período, el cargo es definitivo.</div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" onclick="toggleAccordion(this)"><span class="accordion-title">¿Hay soporte técnico disponible?</span><i class="accordion-icon ph ph-caret-down" style="font-size:16px;"></i></div>
              <div class="accordion-body"><div class="accordion-body-inner">Ofrecemos soporte por chat y email de lunes a viernes de 9am a 6pm. Los usuarios Pro tienen soporte prioritario con respuesta en menos de 2 horas.</div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="comp-label">Accordion — Default & Flush</div>
    </div>
  </div>

  <!-- BREADCRUMB -->
  <div class="comp-section">
    <div class="comp-section-title">Breadcrumb</div>
    <div class="comp-section-desc">Navegación contextual de jerarquía de rutas para portales y plataformas institucionales.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;gap:12px">
        <nav><ol class="breadcrumb-nav"><li class="breadcrumb-item"><a href="#">Inicio</a><span class="breadcrumb-sep">/</span></li><li class="breadcrumb-item"><a href="#">Servicios</a><span class="breadcrumb-sep">/</span></li><li class="breadcrumb-item active"><span>Inscripción 2026</span></li></ol></nav>
        <nav><ol class="breadcrumb-nav"><li class="breadcrumb-item"><a href="#">🏛️ Portal</a><span class="breadcrumb-sep">›</span></li><li class="breadcrumb-item"><a href="#">Mi cuenta</a><span class="breadcrumb-sep">›</span></li><li class="breadcrumb-item"><a href="#">Pagos</a><span class="breadcrumb-sep">›</span></li><li class="breadcrumb-item active"><span>Comprobante #A-2042</span></li></ol></nav>
      </div>
      <div class="comp-label">Breadcrumb</div>
    </div>
  </div>

  <!-- BUTTON GROUP -->
  <div class="comp-section">
    <div class="comp-section-title">Button Group / Toolbar</div>
    <div class="comp-section-desc">Grupos de botones para vistas togglables y toolbars de editor de contenido.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:flex-start;gap:16px">
        <div class="btn-group"><button class="btn-secondary active">Vista lista</button><button class="btn-secondary">Vista tarjetas</button><button class="btn-secondary">Vista tabla</button></div>
        <div class="btn-group"><button class="btn-secondary btn-sm">Día</button><button class="btn-secondary btn-sm active">Semana</button><button class="btn-secondary btn-sm">Mes</button></div>
        <div class="btn-toolbar">
          <div class="btn-group"><button class="btn-secondary btn-sm" style="font-weight:700">B</button><button class="btn-secondary btn-sm" style="font-style:italic">I</button><button class="btn-secondary btn-sm" style="text-decoration:underline">U</button></div>
          <button class="btn-primary btn-sm">Guardar cambios</button>
          <button class="btn-secondary btn-sm">Cancelar</button>
        </div>
      </div>
      <div class="comp-label">Button Groups & Toolbar</div>
    </div>
  </div>

  <!-- CAROUSEL -->
  <div class="comp-section">
    <div class="comp-section-title">Carousel</div>
    <div class="comp-section-desc">Slider de contenido para onboarding, características del producto y anuncios institucionales.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="padding:0;flex-direction:column;width:100%">
        <div class="carousel" id="carousel1">
          <div class="carousel-track" id="carousel-track1">
            <div class="carousel-slide">
              <div class="carousel-slide-icon" style="background:var(--color-violeta-50)">🎓</div>
              <div class="carousel-slide-title">Bienvenido al Portal Institucional</div>
              <div class="carousel-slide-text">Gestiona tus inscripciones, pagos y documentos en un solo lugar. Seguro, rápido y siempre disponible.</div>
              <div style="display:flex;gap:8px"><button class="btn-primary btn-sm">Comenzar registro</button><button class="btn-secondary btn-sm">Ver guía</button></div>
            </div>
            <div class="carousel-slide">
              <div class="carousel-slide-icon" style="background:var(--color-azul-50)">💳</div>
              <div class="carousel-slide-title">Paga de forma segura</div>
              <div class="carousel-slide-text">Acepta tarjeta, transferencia SPEI y pago en OXXO. Tus datos están cifrados con TLS 1.3 y protegidos en todo momento.</div>
              <button class="btn-primary btn-sm">Ver métodos de pago</button>
            </div>
            <div class="carousel-slide">
              <div class="carousel-slide-icon" style="background:var(--color-turquesa-50)">📋</div>
              <div class="carousel-slide-title">Sube tus documentos</div>
              <div class="carousel-slide-text">Adjunta PDF, JPG o PNG de hasta 10MB. El sistema valida automáticamente el formato y la legibilidad de cada archivo.</div>
              <button class="btn-primary btn-sm">Subir documentos</button>
            </div>
          </div>
          <div class="carousel-controls">
            <button class="carousel-btn" onclick="carouselPrev('carousel-track1','carousel-dots1',3)">
              <i class="ph ph-caret-left" style="font-size:14px;margin-right:4px;"></i> Anterior
            </button>
            <div class="carousel-dots" id="carousel-dots1">
              <div class="carousel-dot active" onclick="carouselGoTo('carousel-track1','carousel-dots1',0,3)"></div>
              <div class="carousel-dot" onclick="carouselGoTo('carousel-track1','carousel-dots1',1,3)"></div>
              <div class="carousel-dot" onclick="carouselGoTo('carousel-track1','carousel-dots1',2,3)"></div>
            </div>
            <button class="carousel-btn" onclick="carouselNext('carousel-track1','carousel-dots1',3)">
              Siguiente <i class="ph ph-caret-right" style="font-size:14px;margin-left:4px;"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="comp-label">Carousel — Onboarding Slides</div>
    </div>
  </div>

  <!-- CLOSE BUTTON & COLLAPSE -->
  <div class="comp-section">
    <div class="comp-section-title">Close Button & Collapse</div>
    <div class="comp-section-desc">Botón de cierre en tres tamaños y panel de contenido expandible/colapsable.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:40px;flex-wrap:wrap">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:12px">Close Button — sm / md / lg</div>
          <div style="display:flex;gap:12px;align-items:center">
            <button class="close-btn close-btn-sm"><i class="ph ph-x" style="font-size:10px;"></i></button>
            <button class="close-btn"><i class="ph ph-x" style="font-size:14px;"></i></button>
            <button class="close-btn close-btn-lg"><i class="ph ph-x" style="font-size:18px;"></i></button>
          </div>
        </div>
        <div style="flex:1;min-width:240px">
          <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:12px">Collapse</div>
          <button class="collapse-trigger" onclick="toggleCollapse(this)"><i class="ph ph-caret-down" style="font-size:14px;margin-right:6px"></i>Ver información adicional</button>
          <div class="collapse-body"><div class="collapse-body-inner">Tu información está protegida bajo la Ley Federal de Protección de Datos Personales. El número de referencia de pago expira en 72 horas naturales.</div></div>
          <button class="collapse-trigger" onclick="toggleCollapse(this)" style="margin-top:12px"><i class="ph ph-caret-down" style="font-size:14px;margin-right:6px"></i>Términos y condiciones</button>
          <div class="collapse-body"><div class="collapse-body-inner">Al completar el registro aceptas nuestros Términos de Servicio y Política de Privacidad. Los pagos no son reembolsables excepto en casos excepcionales previamente aprobados.</div></div>
        </div>
      </div>
      <div class="comp-label">Close Button & Collapse</div>
    </div>
  </div>

  <!-- LIST GROUP -->
  <div class="comp-section">
    <div class="comp-section-title">List Group</div>
    <div class="comp-section-desc">Tres variantes: básica con badges, con íconos y estado de pago, y lista numerada de pasos.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:20px;flex-wrap:wrap">
        <div style="width:200px">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Básica</div>
          <div class="list-group">
            <div class="list-group-item active">Perfil</div>
            <div class="list-group-item" style="justify-content:space-between">Documentos<span class="badge badge-warning" style="font-size:10px">2</span></div>
            <div class="list-group-item">Pagos</div>
            <div class="list-group-item">Configuración</div>
            <div class="list-group-item disabled">Historial</div>
          </div>
        </div>
        <div style="flex:1;min-width:260px">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Con ícono y estado</div>
          <div class="list-group">
            <div class="list-group-item"><div class="list-group-item-icon" style="background:var(--color-violeta-50)">🎓</div><div class="list-group-item-content"><div class="list-group-item-title">Inscripción 2026</div><div class="list-group-item-subtitle">Ene-Jun · $3,500</div></div><span class="badge badge-success" style="font-size:10px">Pagado</span></div>
            <div class="list-group-item"><div class="list-group-item-icon" style="background:var(--color-azul-50)">📚</div><div class="list-group-item-content"><div class="list-group-item-title">Material didáctico</div><div class="list-group-item-subtitle">Semestre 1 · $850</div></div><span class="badge badge-warning" style="font-size:10px">Pendiente</span></div>
            <div class="list-group-item"><div class="list-group-item-icon" style="background:var(--color-danger-50)">🏋️</div><div class="list-group-item-content"><div class="list-group-item-title">Cuota laboratorio</div><div class="list-group-item-subtitle">Vencida · $450</div></div><span class="badge badge-danger" style="font-size:10px">Vencido</span></div>
          </div>
        </div>
        <div style="width:200px">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Numerada</div>
          <div class="list-group numbered"><div class="list-group-item">Crear cuenta</div><div class="list-group-item">Verificar email</div><div class="list-group-item">Completar perfil</div><div class="list-group-item">Subir documentos</div><div class="list-group-item">Realizar pago</div></div>
        </div>
      </div>
      <div class="comp-label">List Group — 3 variantes</div>
    </div>
  </div>

  <!-- NAVBAR -->
  <div class="comp-section">
    <div class="comp-section-title">Navbar</div>
    <div class="comp-section-desc">Barra de navegación superior para portales institucionales, variantes clara y oscura.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;align-items:stretch;padding:0;gap:0">
        <div style="padding:20px 20px 12px">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Light</div>
          <nav class="app-navbar"><a class="navbar-brand"><div class="navbar-brand-dot"></div>Portal Institucional</a><ul class="navbar-links"><li><a class="navbar-link active">Inicio</a></li><li><a class="navbar-link">Servicios</a></li><li><a class="navbar-link">Pagos</a></li><li><a class="navbar-link">Soporte</a></li></ul><div class="navbar-actions"><button class="btn-secondary btn-sm">Iniciar sesión</button><button class="btn-primary btn-sm">Registrarse</button></div></nav>
        </div>
        <div style="background:var(--color-neutro-900);padding:20px">
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Dark</div>
          <nav class="app-navbar dark"><a class="navbar-brand"><div class="navbar-brand-dot"></div>Portal Institucional</a><ul class="navbar-links"><li><a class="navbar-link active">Inicio</a></li><li><a class="navbar-link">Servicios</a></li><li><a class="navbar-link">Pagos</a></li><li><a class="navbar-link">Soporte</a></li></ul><div class="navbar-actions"><div class="avatar avatar-sm avatar-violet">AG</div><button class="btn-primary btn-sm">Mi cuenta</button></div></nav>
        </div>
      </div>
      <div class="comp-label">Navbar — Light & Dark</div>
    </div>
  </div>

  <!-- OFFCANVAS STATIC -->
  <div class="comp-section">
    <div class="comp-section-title">Offcanvas</div>
    <div class="comp-section-desc">Panel lateral deslizable para filtros, ayuda y menus de navegación móvil (mostrado en modo estático).</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:20px;flex-wrap:wrap">
        <div class="offcanvas-demo">
          <div class="offcanvas-header"><div class="offcanvas-title">Filtros de búsqueda</div><button class="close-btn"><i class="ph ph-x" style="font-size:14px"></i></button></div>
          <div class="offcanvas-body" style="max-height:180px;overflow:auto">
            <div class="input-group" style="margin-bottom:12px"><label class="input-label">Período</label><select class="select"><option>Enero - Junio 2026</option><option>Julio - Diciembre</option></select></div>
            <div class="input-group" style="margin-bottom:12px"><label class="input-label">Estado</label><select class="select"><option>Todos</option><option>Pagado</option><option>Pendiente</option></select></div>
            <label class="checkbox-wrapper"><input type="checkbox" class="checkbox" checked><span style="font-size:13px">Solo mis registros</span></label>
          </div>
          <div class="offcanvas-footer"><button class="btn-secondary btn-sm">Limpiar</button><button class="btn-primary btn-sm">Aplicar filtros</button></div>
        </div>
        <div class="offcanvas-demo">
          <div class="offcanvas-header"><div class="offcanvas-title">Centro de ayuda</div><button class="close-btn"><i class="ph ph-x" style="font-size:14px"></i></button></div>
          <div class="offcanvas-body" style="max-height:180px;overflow:auto">
            <div class="list-group" style="border:none;border-radius:0">
              <div class="list-group-item" style="padding:12px 0">📋 Guía de inscripción</div>
              <div class="list-group-item" style="padding:12px 0">💳 Métodos de pago</div>
              <div class="list-group-item" style="padding:12px 0">📁 Documentos requeridos</div>
              <div class="list-group-item" style="padding:12px 0;border-color:transparent">💬 Contactar soporte</div>
            </div>
          </div>
        </div>
      </div>
      <div class="comp-label">Offcanvas — Filtros & Ayuda</div>
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="comp-section">
    <div class="comp-section-title">Pagination</div>
    <div class="comp-section-desc">Navegación entre páginas de resultados. Tres estilos: completo, compacto y mini con contador.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;gap:16px;align-items:flex-start">
        <div class="pagination"><button class="page-btn disabled">‹ Anterior</button><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn" style="letter-spacing:2px">···</button><button class="page-btn">12</button><button class="page-btn">Siguiente ›</button></div>
        <div class="pagination"><button class="page-btn">‹</button><button class="page-btn">4</button><button class="page-btn active">5</button><button class="page-btn">6</button><button class="page-btn">›</button></div>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="pagination"><button class="page-btn btn-sm">‹‹</button><button class="page-btn btn-sm active">1</button><button class="page-btn btn-sm">2</button><button class="page-btn btn-sm">3</button><button class="page-btn btn-sm">››</button></div>
          <span style="font-size:12px;color:var(--text-muted)">Mostrando 1-10 de 248 resultados</span>
        </div>
      </div>
      <div class="comp-label">Pagination</div>
    </div>
  </div>

  <!-- SPINNERS -->
  <div class="comp-section">
    <div class="comp-section-title">Spinners</div>
    <div class="comp-section-desc">Tres tipos de indicadores de carga: circular, puntos y barras. Todos los colores del sistema.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;gap:20px;align-items:flex-start">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px"><div class="spinner sm"></div><span style="font-size:11px;color:var(--text-muted)">sm</span></div>
          <div style="display:flex;align-items:center;gap:6px"><div class="spinner"></div><span style="font-size:11px;color:var(--text-muted)">md</span></div>
          <div style="display:flex;align-items:center;gap:6px"><div class="spinner lg"></div><span style="font-size:11px;color:var(--text-muted)">lg</span></div>
          <div style="display:flex;align-items:center;gap:6px"><div class="spinner xl"></div><span style="font-size:11px;color:var(--text-muted)">xl</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div class="spinner"></div>
          <div class="spinner blue"></div>
          <div class="spinner success"></div>
          <div class="spinner warning"></div>
          <div class="spinner danger"></div>
          <div style="background:var(--color-neutro-900);padding:8px 12px;border-radius:8px;display:flex;align-items:center;gap:8px"><div class="spinner white"></div><span style="font-size:12px;color:rgba(255,255,255,0.6)">Cargando...</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div class="spinner-dots"><div class="spinner-dot"></div><div class="spinner-dot"></div><div class="spinner-dot"></div></div>
          <div class="spinner-bars"><div class="spinner-bar"></div><div class="spinner-bar"></div><div class="spinner-bar"></div><div class="spinner-bar"></div></div>
          <button class="btn-primary" style="display:flex;gap:8px;align-items:center;pointer-events:none">
            <div class="spinner white" style="width:14px;height:14px;border-width:2px"></div>Procesando pago...
          </button>
        </div>
      </div>
      <div class="comp-label">Spinners — Ring / Dots / Bars</div>
    </div>
  </div>

  <!-- TOOLTIPS & POPOVERS -->
  <div class="comp-section">
    <div class="comp-section-title">Tooltips & Popovers</div>
    <div class="comp-section-desc">Información contextual al hover: tooltips para hints breves y popovers para contenido enriquecido.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="flex-direction:column;gap:0;padding:0;align-items:stretch">
        <div style="padding:48px 24px 20px;display:flex;gap:24px;flex-wrap:wrap">
          <div class="tooltip-wrapper"><button class="btn-secondary">Arriba (default)</button><div class="tooltip">Acción disponible en tu plan</div></div>
          <div class="tooltip-wrapper"><button class="btn-secondary">Hacia abajo</button><div class="tooltip bottom">Se guardará automáticamente</div></div>
          <div class="tooltip-wrapper"><button class="btn-secondary">Hacia derecha</button><div class="tooltip right">Ver detalle completo</div></div>
          <div class="tooltip-wrapper"><button class="btn-primary">Estilo violeta</button><div class="tooltip violet">Solo usuarios Pro</div></div>
        </div>
        <div style="padding:20px 24px 32px;border-top:1px solid var(--border-color);display:flex;gap:24px;flex-wrap:wrap;align-items:flex-end">
          <div class="popover-wrapper" style="margin-top:140px">
            <button class="btn-outline">Ver referencia de pago</button>
            <div class="popover">
              <div class="popover-title">Referencia de pago</div>
              <div class="popover-body">Tu referencia es válida por 72 horas. Úsala en OXXO o transferencia. Una vez vencida deberás generar una nueva.<br><br><a href="#" style="color:var(--color-violeta-500);font-weight:600;font-size:12px">Ver instrucciones completas →</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="comp-label">Tooltips & Popovers</div>
    </div>
  </div>

  <!-- CARDS EXTENDED -->
  <div class="comp-section">
    <div class="comp-section-title">Cards Extendidas</div>
    <div class="comp-section-desc">Card con encabezado visual y cards horizontales con acento de color para estados de pago.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:20px;flex-wrap:wrap">
        <div class="card-image" style="width:200px">
          <div class="card-image-header">🎓</div>
          <div class="card-image-body">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">Inscripción 2026</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">Ene - Jun · Ciclo escolar</div>
            <button class="btn-primary btn-sm" style="width:100%;justify-content:center">Inscribirse</button>
          </div>
        </div>
        <div style="flex:1;min-width:260px;display:flex;flex-direction:column;gap:10px">
          <div class="card-horizontal"><div class="card-horizontal-accent"></div><div class="card-horizontal-body"><div style="font-weight:700;font-size:14px">Inscripción semestral</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Vence: 31 mar · $3,500</div></div><div style="padding:18px 16px;display:flex;align-items:center"><span class="badge badge-warning" style="font-size:10px">Pendiente</span></div></div>
          <div class="card-horizontal"><div class="card-horizontal-accent success"></div><div class="card-horizontal-body"><div style="font-weight:700;font-size:14px">Material didáctico</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Pagado: 5 ene · $850</div></div><div style="padding:18px 16px;display:flex;align-items:center"><span class="badge badge-success" style="font-size:10px">Pagado</span></div></div>
          <div class="card-horizontal"><div class="card-horizontal-accent danger"></div><div class="card-horizontal-body"><div style="font-weight:700;font-size:14px">Cuota laboratorio</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">Vencida: 15 feb · $450</div></div><div style="padding:18px 16px;display:flex;align-items:center"><span class="badge badge-danger" style="font-size:10px">Vencido</span></div></div>
        </div>
      </div>
      <div class="comp-label">Cards — Image Header & Horizontal Accent</div>
    </div>
  </div>

  <!-- TOASTS -->
  <div class="comp-section">
    <div class="comp-section-title">Toasts</div>
    <div class="comp-section-desc">Notificaciones flotantes temporales. Estados semánticos y variante oscura.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:20px;flex-wrap:wrap">
        <div class="toast-stack">
          <div class="ds-toast toast-info"><div class="toast-icon" style="background:var(--color-violeta-50)">ℹ️</div><div class="toast-content"><div class="toast-title">Documento recibido</div><div class="toast-body-text">Tu identificación fue cargada exitosamente.</div></div><button class="close-btn close-btn-sm"><i class="ph ph-x" style="font-size:10px"></i></button></div>
          <div class="ds-toast toast-success"><div class="toast-icon" style="background:var(--color-success-50)">✅</div><div class="toast-content"><div class="toast-title">Pago confirmado</div><div class="toast-body-text">Folio: #INS-2026-0042 · $3,500 MXN</div></div><button class="close-btn close-btn-sm"><i class="ph ph-x" style="font-size:10px"></i></button></div>
          <div class="ds-toast toast-warning"><div class="toast-icon" style="background:var(--color-warning-50)">⚠️</div><div class="toast-content"><div class="toast-title">Referencia por vencer</div><div class="toast-body-text">Tu referencia de pago expira en 2 horas.</div></div><button class="close-btn close-btn-sm"><i class="ph ph-x" style="font-size:10px"></i></button></div>
          <div class="ds-toast toast-danger"><div class="toast-icon" style="background:var(--color-danger-50)">❌</div><div class="toast-content"><div class="toast-title">Error de pago</div><div class="toast-body-text">Tarjeta rechazada. Verifica los datos.</div></div><button class="close-btn close-btn-sm"><i class="ph ph-x" style="font-size:10px"></i></button></div>
        </div>
        <div class="toast-stack">
          <div class="ds-toast dark toast-info"><div class="toast-icon" style="background:rgba(114,70,229,.2)">ℹ️</div><div class="toast-content"><div class="toast-title">Sesión activa</div><div class="toast-body-text">Iniciaste sesión desde Chrome · México.</div></div><button class="close-btn close-btn-sm" style="color:rgba(255,255,255,0.4)"><i class="ph ph-x" style="font-size:10px"></i></button></div>
          <div class="ds-toast dark toast-success"><div class="toast-icon" style="background:rgba(40,167,69,.2)">✅</div><div class="toast-content"><div class="toast-title">Comprobante generado</div><div class="toast-body-text">PDF enviado a tu correo registrado.</div></div><button class="close-btn close-btn-sm" style="color:rgba(255,255,255,0.4)"><i class="ph ph-x" style="font-size:10px"></i></button></div>
        </div>
      </div>
      <div class="comp-label">Toasts — Light & Dark</div>
    </div>
  </div>

  <!-- DROPDOWN BUTTON -->
  <div class="comp-section">
    <div class="comp-section-title">Dropdown Button</div>
    <div class="comp-section-desc">Botón con menú contextual interactivo.</div>
    <div class="comp-preview">
      <div class="comp-canvas" style="align-items:flex-start;gap:24px;padding-bottom:120px;">
        <div class="dropdown">
          <button class="btn-primary dropdown-toggle" onclick="toggleDropdown(this)">
            Acciones <i class="ph ph-caret-down" style="font-size:14px;margin-left:6px"></i>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item"><i class="ph ph-pencil-simple" style="font-size:14px"></i> Editar</div>
            <div class="dropdown-item"><i class="ph ph-copy" style="font-size:14px"></i> Duplicar</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger"><i class="ph ph-trash" style="font-size:14px"></i> Eliminar</div>
          </div>
        </div>

        <div class="dropdown">
          <button class="btn-secondary dropdown-toggle" onclick="toggleDropdown(this)">
            Ajustes <i class="ph ph-caret-down" style="font-size:14px;margin-left:6px"></i>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item">Perfil de usuario</div>
            <div class="dropdown-item">Preferencias</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger">Cerrar sesión</div>
          </div>
        </div>
      </div>
      <div class="comp-label">Dropdown Button</div>
    </div>
  </div>
    `;
    el.appendChild(extra);
  }

  // ── Dropdown logic ────────────────────────────────────────
  window.toggleDropdown = function (btn) {
    const dropdown = btn.closest('.dropdown');
    document.querySelectorAll('.dropdown.open').forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });
    dropdown.classList.toggle('open');
  };

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  // ── Accordion toggle ──────────────────────────────────────
  window.toggleAccordion = function (header) {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    // If not in an always-open accordion, close siblings
    if (!isOpen) {
      const siblings = item.closest('.accordion').querySelectorAll('.accordion-item.open');
      siblings.forEach(s => s.classList.remove('open'));
    }
    item.classList.toggle('open', !isOpen);
  };

  // ── Collapse toggle ───────────────────────────────────────
  window.toggleCollapse = function (btn) {
    btn.classList.toggle('open');
    const body = btn.nextElementSibling;
    if (body && body.classList.contains('collapse-body')) {
      body.classList.toggle('open');
    }
  };

  // ── Carousel controls ─────────────────────────────────────
  const carouselState = {};

  window.carouselGoTo = function (trackId, dotsId, idx, total) {
    carouselState[trackId] = idx;
    const track = document.getElementById(trackId);
    if (track) track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    const dotsEl = document.getElementById(dotsId);
    if (dotsEl) {
      dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  };

  window.carouselNext = function (trackId, dotsId, total) {
    const cur = (carouselState[trackId] || 0);
    window.carouselGoTo(trackId, dotsId, (cur + 1) % total, total);
  };

  window.carouselPrev = function (trackId, dotsId, total) {
    const cur = (carouselState[trackId] || 0);
    window.carouselGoTo(trackId, dotsId, (cur - 1 + total) % total, total);
  };

  // Run after app.js renders components
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addComponents();
      if (window.buildSubmenus) window.buildSubmenus();
    });
  } else {
    // app.js already ran, append immediately
    setTimeout(() => {
      addComponents();
      if (window.buildSubmenus) window.buildSubmenus();
    }, 50);
  }
})();
