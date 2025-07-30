
document.addEventListener('DOMContentLoaded', function () {
  const blogHeaders = document.querySelectorAll('.blog-header');

  blogHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const blogContent = this.nextElementSibling;
      const icon = this.querySelector('.fa-chevron-down');

      const isVisible = blogContent.classList.contains('visivel');

      // Fecha todos os conteúdos
      document.querySelectorAll('.blog-content').forEach(content => content.classList.remove('visivel'));
      document.querySelectorAll('.fa-chevron-down').forEach(ic => ic.classList.remove('rotate'));

      if (!isVisible) {
        blogContent.classList.add('visivel');
        icon.classList.add('rotate');
      }
    });
  });
});
