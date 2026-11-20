document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5554999188692';

  // =========================================
  // 1. RASTREAMENTO GA4 + META PIXEL (ADS)
  // =========================================
  function trackEvent(eventName, label) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        event_category: 'conversao',
        event_label: label
      });
    }
    if (typeof fbq === 'function') {
      fbq('track', 'Contact', { content_name: label });
    }
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      trackEvent('clique_cta', el.getAttribute('data-track'));
    });
  });

  // =========================================
  // 2. HEADER COM SOMBRA E MENU MOBILE
  // =========================================
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  function closeMenu() {
    if (!navMenu || !hamburgerBtn) return;
    navMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // =========================================
  // 3. SELETOR DE DOENÇAS -> ABRE WHATSAPP
  // =========================================
  document.querySelectorAll('.condition-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const condition = btn.getAttribute('data-condition');
      const message = `Olá Dra. Cristiane! Vi no site sobre *${condition}* e gostaria de saber como funciona o laudo técnico para o meu caso.`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      trackEvent('whatsapp_condicao', condition);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // =========================================
  // 4. FAQ ACORDEÃO INTERATIVO
  // =========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;

      // Fecha os outros itens abertos
      faqQuestions.forEach((otherBtn) => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // =========================================
  // 5. FORMULÁRIO DE CONTATO -> WHATSAPP
  // =========================================
  const contactForm = document.getElementById('contactForm');

  function clearError(field) {
    field.classList.remove('input-error');
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }

  function showError(field, msg) {
    clearError(field);
    field.classList.add('input-error');
    const span = document.createElement('span');
    span.className = 'field-error';
    span.textContent = msg;
    field.parentElement.appendChild(span);
  }

  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => clearError(field));
      field.addEventListener('change', () => clearError(field));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          showError(field, 'Por favor, preencha este campo.');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstError = contactForm.querySelector('.input-error');
        if (firstError) firstError.focus();
        return;
      }

      const nome = document.getElementById('nome').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      const textoWhatsApp =
        `*Atendimento pelo Site - crisfisioforense.com.br*\n\n` +
        `*Nome / Escritório:* ${nome}\n` +
        `*Cidade / Estado:* ${cidade}\n` +
        `*WhatsApp:* ${whatsapp}\n` +
        `*Demanda:* ${servico}\n\n` +
        `*Resumo do Caso:* ${mensagem || 'Aguardando orientações iniciais.'}`;

      trackEvent('formulario_whatsapp', servico);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textoWhatsApp)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      contactForm.reset();
    });
  }

  // =========================================
  // 6. ANIMAÇÃO SUTIL AO ROLAR (INTERSECTION OBSERVER)
  // =========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
