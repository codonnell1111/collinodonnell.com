<script src="script.js"></script>
</body>
</html>

// Scroll behavior for all carousel wrappers
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const container = wrapper.querySelector('.scroll-container');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  leftBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -container.clientWidth * 0.8,
      behavior: 'smooth'
    });
  });

  rightBtn.addEventListener('click', () => {
    container.scrollBy({
      left: container.clientWidth * 0.8,
      behavior: 'smooth'
    });
  });
});
