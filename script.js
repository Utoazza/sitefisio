// Carregamento da página
window.addEventListener('load', function() {
  document.getElementById('loading').style.display = 'none';
});

// Menu mobile
document.getElementById('menu-toggle').addEventListener('click', function() {
  document.getElementById('nav-menu').classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Fechar menu mobile após click
      document.getElementById('nav-menu').classList.remove('active');
    }
  });
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const icon = this.querySelector('i');
    
    // Fechar outros FAQs
    document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
      if (otherAnswer !== answer) {
        otherAnswer.classList.remove('active');
        const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
        otherIcon.style.transform = 'rotate(0deg)';
      }
    });
    
    // Toggle atual
    answer.classList.toggle('active');
    icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

// Blog expandible functionality
function toggleBlog(element) {
  const blogContent = element.nextElementSibling;
  const icon = element.querySelector('.blog-toggle');
  
  // Fechar outros blogs
  document.querySelectorAll('.blog-content').forEach(content => {
    if (content !== blogContent) {
      content.classList.remove('active');
      const otherIcon = content.previousElementSibling.querySelector('.blog-toggle');
      otherIcon.style.transform = 'rotate(0deg)';
    }
  });
  
  // Toggle atual
  blogContent.classList.toggle('active');
  icon.style.transform = blogContent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loading
  const submitButton = document.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitButton.disabled = true;
  
  // Get form data
  const formData = new FormData(this);
  const nome = formData.get('nome');
  const email = formData.get('email');
  const telefone = formData.get('telefone');
  const servico = formData.get('servico');
  const mensagem = formData.get('mensagem');
  
  // Create WhatsApp message
  const whatsappMessage = `🔹 *SOLICITAÇÃO DE ORÇAMENTO* 🔹

👤 *Nome:* ${nome}
📧 *E-mail:* ${email}
📱 *Telefone:* ${telefone}
🔧 *Serviço:* ${servico}

💬 *Mensagem:*
${mensagem}

---
Enviado através do site crisfisioforense.com.br`;
  
  // Simulate processing time
  setTimeout(() => {
    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/5554999188692?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form
    this.reset();
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    
    // Show success message
    showNotification('Redirecionando para WhatsApp! Sua mensagem foi preparada.', 'success');
  }, 1500);
});

// Show notification function
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 350px;
    animation: slideInRight 0.3s ease;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .blog-item').forEach(el => {
  observer.observe(el);
});

// Enhanced form validation
const inputs = document.querySelectorAll('input, textarea, select');
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

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
    }
  }
  
  // Phone validation
  if (field.type === 'tel' && value) {
    const phoneRegex = /^\(?[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
    }
  }
  
  // Apply styles
  if (isValid) {
    field.style.borderColor = '#10b981';
    field.classList.remove('error');
  } else {
    field.style.borderColor = '#ef4444';
    field.classList.add('error');
  }
  
  return isValid;
}

// Auto-resize textarea
document.querySelector('textarea').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

// Lazy loading for images
const images = document.querySelectorAll('img');
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

images.forEach(img => imageObserver.observe(img));

// Add smooth animations to elements
function addScrollAnimations() {
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .blog-item, .about-content');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('nav-menu');
  const toggle = document.getElementById('menu-toggle');
  
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close mobile menu
    document.getElementById('nav-menu').classList.remove('active');
    
    // Close any open FAQ or blog items
    document.querySelectorAll('.faq-answer.active, .blog-content.active').forEach(item => {
      item.classList.remove('active');
      const icon = item.previousElementSibling.querySelector('i, .blog-toggle');
      if (icon) icon.style.transform = 'rotate(0deg)';
    });
  }
});

// Performance optimization: Debounce scroll events
let ticking = false;
function updateOnScroll() {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
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
  
  .notification button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
document.head.appendChild(style);