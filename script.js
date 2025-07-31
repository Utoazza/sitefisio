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
  
  const blogHeaders = document.querySelectorAll('.blog-header');
  console.log(`📝 Encontrados ${blogHeaders.length} artigos do blog`);
  
  blogHeaders.forEach((header, index) => {
    console.log(`📄 Configurando artigo ${index + 1}`);
    
    header.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`🖱️ Clicado no artigo ${index + 1}`);
      toggleBlogItem(this);
    });
    
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        console.log(`⌨️ Teclado pressionado no artigo ${index + 1}`);
        toggleBlogItem(this);
      }
    });
    
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
    
    setTimeout(() => {
      headerElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 300);
  }
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.log('⚠️ Formulário de contato não encontrado');
    return;
  }
  
  console.log('📧 Inicializando formulário de contato...');
  
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
  
  const textarea = contactForm.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission(this);
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo é obrigatório';
  }
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Email inválido';
    }
  }
  
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Telefone inválido';
    }
  }
  
  if (isValid) {
    field.style.borderColor = '#10b981';
    field.classList.remove('error');
    removeErrorMessage(field);
  } else {
    field.style.borderColor = '#ef4444';
    field.classList.add('error');
    showErrorMessage(field, errorMessage);
  }
  
  return isValid;
}

function showErrorMessage(field, message) {
  removeErrorMessage(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  `;
  
  field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

function handleFormSubmission(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showNotification('Por favor, corrija os erros no formulário.', 'error');
    return;
  }
  
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitButton.disabled = true;
  
  const formData = new FormData(form);
  const dados = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    telefone: formData.get('telefone'),
    servico: formData.get('servico'),
    mensagem: formData.get('mensagem')
  };
  
  const whatsappMessage = createWhatsAppMessage(dados);
  
  setTimeout(() => {
    const whatsappURL = `https://wa.me/5554999188692?text=${encodeURIComponent(whatsappMessage)}`;
    
    if (isMobileDevice()) {
      window.location.href = whatsappURL;
    } else {
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }
    
    form.reset();
    inputs.forEach(input => {
      input.style.borderColor = '';
      input.classList.remove('error');
      removeErrorMessage(input);
    });
    
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    
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
// NOTIFICAÇÕES
// ========================================

function showNotification(message, type = 'info') {
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
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
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification && notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}
