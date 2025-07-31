// ========================================
// INICIALIZAÇÃO E CONFIGURAÇÕES GLOBAIS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Inicializar todas as funcionalidades
  initMobileMenu();
  initSmoothScrolling();
  initFAQ();
  initBlog();
  initContactForm();
  initScrollEffects();
  initAccessibility();
  initPerformanceOptimizations();
  
  console.log('✅ Site inicializado com sucesso!');
}

// ========================================
// MENU MOBILE
// ========================================

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  // Toggle menu mobile
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMobileMenu();
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Fechar menu ao redimensionar tela
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
  
  // Suporte a toque (mobile)
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  });
  
  document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchStartX - touchEndX;
    
    // Fechar menu com swipe para esquerda
    if (touchDiff > 50 && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const icon = menuToggle.querySelector('i');
  
  navMenu.classList.toggle('active');
  
  // Alterar ícone
  if (navMenu.classList.contains('active')) {
    icon.className = 'fas fa-times';
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  } else {
    icon.className = 'fas fa-bars';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const icon = menuToggle.querySelector('i');
  
  navMenu.classList.remove('active');
  icon.className = 'fas fa-bars';
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ========================================
// NAVEGAÇÃO SUAVE
// ========================================

function initSmoothScrolling() {
  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Fechar menu mobile se estiver aberto
        closeMobileMenu();
        
        // Calcular offset do header
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const offset = 20; // Espaçamento adicional
        
        // Scroll suave
        const targetPosition = targetElement.offsetTop - headerHeight - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Atualizar URL sem recarregar página
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

// ========================================
// FAQ INTERATIVO
// ========================================

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      toggleFAQItem(this);
    });
    
    // Suporte a teclado
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQItem(this);
      }
    });
  });
}

function toggleFAQItem(questionElement) {
  const answer = questionElement.nextElementSibling;
  const icon = questionElement.querySelector('i');
  const isActive = answer.classList.contains('active');
  
  // Fechar outros FAQs
  document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
    if (otherAnswer !== answer && otherAnswer.classList.contains('active')) {
      otherAnswer.classList.remove('active');
      const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
      if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      otherAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Toggle atual
  if (isActive) {
    answer.classList.remove('active');
    if (icon) icon.style.transform = 'rotate(0deg)';
    questionElement.setAttribute('aria-expanded', 'false');
  } else {
    answer.classList.add('active');
    if (icon) icon.style.transform = 'rotate(180deg)';
    questionElement.setAttribute('aria-expanded', 'true');
  }
}

// ========================================
// BLOG EXPANSÍVEL (CORRIGIDO)
// ========================================

function initBlog() {
  console.log('🔧 Inicializando blog...');
  
  // Selecionar todos os headers do blog
  const blogHeaders = document.querySelectorAll('.blog-header');
  console.log(`📝 Encontrados ${blogHeaders.length} artigos do blog`);
  
  blogHeaders.forEach((header, index) => {
    console.log(`📄 Configurando artigo ${index + 1}`);
    
    // Adicionar evento de click
    header.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`🖱️ Clicado no artigo ${index + 1}`);
      toggleBlogItem(this);
    });
    
    // Suporte a teclado
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        console.log(`⌨️ Teclado pressionado no artigo ${index + 1}`);
        toggleBlogItem(this);
      }
    });
    
    // Adicionar atributos de acessibilidade
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');
  });
}

function toggleBlogItem(headerElement) {
  console.log('🔄 Executando toggleBlogItem...');
  
  const blogContent = headerElement.nextElementSibling;
  const icon = headerElement.querySelector('i');
  
  if (!blogContent) {
    console.error('❌ Conteúdo do blog não encontrado!');
    return;
  }
  
  if (!icon) {
    console.error('❌ Ícone do blog não encontrado!');
    return;
  }
  
  const isActive = blogContent.classList.contains('active');
  console.log(`📊 Status atual: ${isActive ? 'aberto' : 'fechado'}`);
  
  // Fechar outros blogs
  document.querySelectorAll('.blog-content').forEach(content => {
    if (content !== blogContent && content.classList.contains('active')) {
      console.log('🔒 Fechando outro blog...');
      content.classList.remove('active');
      const otherIcon = content.previousElementSibling.querySelector('i');
      if (otherIcon) {
        otherIcon.style.transform = 'rotate(0deg)';
      }
      content.previousElementSibling.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Toggle atual
  if (isActive) {
    console.log('🔒 Fechando blog atual...');
    blogContent.classList.remove('active');
    icon.style.transform = 'rotate(0deg)';
    headerElement.setAttribute('aria-expanded', 'false');
  } else {
    console.log('🔓 Abrindo blog atual...');
    blogContent.classList.add('active');
    icon.style.transform = 'rotate(180deg)';
    headerElement.setAttribute('aria-expanded', 'true');
    
    // Scroll suave para o artigo aberto
    setTimeout(() => {
      headerElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 300);
  }
}

// Função global para compatibilidade com HTML
window.toggleBlog = function(element) {
  console.log('🌐 toggleBlog global chamada');
  toggleBlogItem(element);
};

// ========================================
// FORMULÁRIO DE CONTATO (MENSAGENS CORRIGIDAS)
// ========================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.log('⚠️ Formulário de contato não encontrado');
    return;
  }
  
  console.log('📧 Inicializando formulário de contato...');
  
  // Validação em tempo real
  const inputs = contactForm.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });
  
  // Auto-resize textarea
  const textarea = contactForm.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  
  // Envio do formulário
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission(this);
  });
  
  // Forçar cores corretas no select (mobile fix)
  const selects = contactForm.querySelectorAll('select');
  selects.forEach(select => {
    // Forçar estilo ao carregar
    applySelectStyles(select);
    
    // Forçar estilo ao mudar
    select.addEventListener('change', function() {
      applySelectStyles(this);
    });
    
    // Forçar estilo ao focar
    select.addEventListener('focus', function() {
      applySelectStyles(this);
    });
  });
}

function applySelectStyles(select) {
  select.style.color = '#1f2937';
  select.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  select.style.webkitTextFillColor = '#1f2937';
  select.style.webkitAppearance = 'none';
  select.style.appearance = 'none';
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Campo obrigatório
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo é obrigatório';
  }
  
  // Validação de email
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Email inválido';
    }
  }
  
  // Validação de telefone
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Telefone inválido';
    }
  }
  
  // Aplicar estilos de validação
  if (isValid) {
    field.style.borderColor = '#10b981';
    field.classList.remove('error');
    removeErrorMessage(field);
  } else {
    field.style.borderColor = '#fbbf24'; // DOURADO para erro
    field.classList.add('error');
    showErrorMessage(field, errorMessage);
  }
  
  return isValid;
}

// ========================================
// MENSAGENS DE ERRO TOTALMENTE VISÍVEIS
// ========================================

function showErrorMessage(field, message) {
  removeErrorMessage(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // ESTILOS FORÇADOS PARA MÁXIMA VISIBILIDADE
  errorDiv.style.cssText = `
    color: #fbbf24 !important;
    background: rgba(251, 191, 36, 0.15) !important;
    font-size: 0.875rem !important;
    margin-top: 0.5rem !important;
    padding: 8px 12px !important;
    border-radius: 6px !important;
    border-left: 3px solid #fbbf24 !important;
    display: block !important;
    font-weight: 600 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
    backdrop-filter: blur(5px) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    z-index: 10 !important;
    position: relative !important;
  `;
  
  field.parentNode.appendChild(errorDiv);
  
  // Adicionar classe ao campo para estilo de erro
  field.classList.add('error');
  
  console.log('❌ Mensagem de erro adicionada:', message);
}

function removeErrorMessage(field) {
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
    console.log('✅ Mensagem de erro removida');
  }
  
  // Remover classe de erro do campo
  field.classList.remove('error');
}

function handleFormSubmission(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  // Validar todos os campos
  const inputs = form.querySelectorAll('input, textarea, select');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showNotification('Por favor, corrija os erros no formulário.', 'error');
    // Scroll para o primeiro erro
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }
  
  // Mostrar loading
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitButton.disabled = true;
  
  // Coletar dados do formulário
  const formData = new FormData(form);
  const dados = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    telefone: formData.get('telefone'),
    servico: formData.get('servico'),
    mensagem: formData.get('mensagem')
  };
  
  // Criar mensagem para WhatsApp
  const whatsappMessage = createWhatsAppMessage(dados);
  
  // Simular envio (delay para UX)
  setTimeout(() => {
    // Abrir WhatsApp
    const whatsappURL = `https://wa.me/5554999188692?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Detectar dispositivo e abrir adequadamente
    if (isMobileDevice()) {
      window.location.href = whatsappURL;
    } else {
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }
    
    // Resetar formulário
    form.reset();
    inputs.forEach(input => {
      input.style.borderColor = '';
      input.classList.remove('error');
      removeErrorMessage(input);
    });
    
    // Restaurar botão
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    
    // Mostrar mensagem de sucesso
    showNotification('Redirecionando para WhatsApp! Sua mensagem foi preparada.', 'success');
    
  }, 1500);
}

function createWhatsAppMessage(dados) {
  return `🔹 *SOLICITAÇÃO DE ORÇAMENTO* 🔹

👤 *Nome:* ${dados.nome}
📧 *E-mail:* ${dados.email}
📱 *Telefone:* ${dados.telefone}
🔧 *Serviço:* ${dados.servico}

💬 *Mensagem:*
${dados.mensagem}

---
📱 Enviado pelo site: crisfisioforense.com.br
⏰ Data: ${new Date().toLocaleString('pt-BR')}`;
}

// ========================================
// NOTIFICAÇÕES MELHORADAS
// ========================================

function showNotification(message, type = 'info') {
  // Remover notificações existentes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Criar nova notificação
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 
               type === 'error' ? 'fa-exclamation-circle' : 
               'fa-info-circle';
  
  const bgColor = type === 'success' ? '#10b981' : 
                  type === 'error' ? '#ef4444' : 
                  '#3b82f6';
  
  notification.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" aria-label="Fechar notificação">×</button>
  `;
  
  // Estilos da notificação
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
  `;
  
  // Estilo do botão fechar
  const closeButton = notification.querySelector('button');
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  `;
  
  closeButton.addEventListener('mouseenter', () => {
    closeButton.style.background = 'rgba(255,255,255,0.2)';
  });
  
  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.background = 'none';
  });
  
  // Adicionar ao DOM
  document.body.appendChild(notification);
  
  // Auto-remover após 5 segundos
  setTimeout(() => {
    if (notification && notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ========================================
// EFEITOS DE SCROLL
// ========================================

function initScrollEffects() {
  // Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(
    '.service-card, .testimonial, .blog-item, .about-content'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========================================
// DETECÇÃO DE DISPOSITIVO
// ========================================

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// ========================================
// ACESSIBILIDADE
// ========================================

function initAccessibility() {
  // Navegação por teclado
  document.addEventListener('keydown', function(e) {
    // Fechar menus com ESC
    if (e.key === 'Escape') {
      closeMobileMenu();
      
      // Fechar FAQs e Blogs abertos
      document.querySelectorAll('.faq-answer.active, .blog-content.active').forEach(item => {
        item.classList.remove('active');
        const icon = item.previousElementSibling.querySelector('i');
        if (icon) icon.style.transform = 'rotate(0deg)';
        item.previousElementSibling.setAttribute('aria-expanded', 'false');
      });
    }
    
    // Navegação com Tab melhorada
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  // Remover indicador de navegação por teclado ao usar mouse
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Melhorar contraste em modo de alto contraste
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
  }
  
  // Reduzir movimento se preferido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
  }
}

// ========================================
// OTIMIZAÇÕES DE PERFORMANCE
// ========================================

function initPerformanceOptimizations() {
  // Lazy loading para imagens
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Debounce para eventos de scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
  });
  
  // Preload de recursos críticos
  preloadCriticalResources();
}

function handleScroll() {
  // Efeitos de scroll otimizados podem ser adicionados aqui
}

function preloadCriticalResources() {
  // Preload da fonte principal
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
}

// ========================================
// TRATAMENTO DE ERROS
// ========================================

window.addEventListener('error', function(e) {
  console.error('Erro capturado:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Promise rejeitada:', e.reason);
  e.preventDefault();
});

// ========================================
// UTILITÁRIOS GLOBAIS
// ========================================

// Função para copiar texto
window.copyToClipboard = function(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Texto copiado!', 'success');
    });
  } else {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Texto copiado!', 'success');
  }
};

// ========================================
// CSS DINÂMICO PARA ANIMAÇÕES
// ========================================

// Adicionar estilos de animação via JavaScript
const animationStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .keyboard-navigation *:focus {
    outline: 3px solid #ec4899 !important;
    outline-offset: 2px;
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .high-contrast {
    filter: contrast(1.5);
  }
  
  .loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

// Inserir estilos no documento
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// ========================================
// ANALYTICS E MONITORAMENTO
// ========================================

// Função para trackear eventos
window.trackEvent = function(category, action, label) {
  console.log('Evento trackeado:', { category, action, label });
  
  // Exemplo para Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

// Trackear cliques nos botões importantes
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn-primary')) {
    trackEvent('Button', 'Click', 'Primary CTA');
  }
  if (e.target.matches('.whatsapp-float')) {
    trackEvent('WhatsApp', 'Click', 'Floating Button');
  }
  if (e.target.closest('.blog-header')) {
    trackEvent('Blog', 'Toggle', 'Article Expand');
  }
  if (e.target.closest('.faq-question')) {
    trackEvent('FAQ', 'Toggle', 'Question Expand');
  }
});

// ========================================
// DEBUG E LOGS
// ========================================

// Função para debug
window.debugSite = function() {
  console.log('🔧 === DEBUG SITE ===');
  console.log('📱 Mobile:', isMobileDevice());
  console.log('🍎 iOS:', isIOS());
  console.log('🤖 Android:', isAndroid());
  console.log('📏 Largura da tela:', window.innerWidth);
  console.log('🎯 FAQs encontrados:', document.querySelectorAll('.faq-question').length);
  console.log('📝 Blogs encontrados:', document.querySelectorAll('.blog-header').length);
  console.log('📧 Formulário encontrado:', !!document.getElementById('contactForm'));
  console.log('🚨 Mensagens de erro visíveis:', document.querySelectorAll('.error-message').length);
};

console.log('🚀 Script carregado com sucesso! Site otimizado para todos os dispositivos.');
console.log('💡 Execute debugSite() no console para informações de debug.');

// ========================================
// FIX ESPECÍFICO PARA MOBILE SELECTS E MENSAGENS
// ========================================

// Aguardar carregamento completo para aplicar fixes
window.addEventListener('load', function() {
  // Fix para selects no mobile
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    applySelectStyles(select);
    
    // Re-aplicar ao focar (mobile)
    select.addEventListener('focus', function() {
      setTimeout(() => {
        applySelectStyles(this);
      }, 10);
    });
    
    // Re-aplicar ao mudar (mobile)
    select.addEventListener('change', function() {
      applySelectStyles(this);
    });
  });
  
  // Garantir que mensagens de erro sejam visíveis
  const existingErrors = document.querySelectorAll('.error-message');
  existingErrors.forEach(error => {
    error.style.color = '#fbbf24 !important';
    error.style.fontWeight = '600 !important';
    error.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2) !important';
  });
  
  console.log('✅ Fixes mobile e mensagens aplicados com sucesso!');
});