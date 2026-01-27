// Smooth nav toggle and theme handling
(function () {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburger');
  const themeToggle = document.querySelector('.theme-toggle');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');
  const openCitationBtn = document.getElementById('openCitation');
  const citationModal = document.getElementById('citationModal');
  const copyBibtexBtn = document.getElementById('copyBibtex');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Theme persistence
  const THEME_KEY = 'proskill-theme';
  const applyTheme = () => {};

  // Back to top visibility
  const onScroll = () => {
    if (!backToTop) return;
    const show = window.scrollY > 500;
    backToTop.classList.toggle('show', show);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Citation modal
  const toggleModal = (show) => {
    if (!citationModal) return;
    citationModal.classList.toggle('show', show);
    citationModal.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (show) {
      const pre = citationModal.querySelector('#bibtex');
      if (pre) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  if (openCitationBtn) openCitationBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleModal(true); });
  if (citationModal) {
    citationModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); toggleModal(false); }));
    citationModal.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) toggleModal(false); });
  }
  if (copyBibtexBtn) {
    copyBibtexBtn.addEventListener('click', async () => {
      const text = document.getElementById('bibtex')?.innerText || '';
      try {
        await navigator.clipboard.writeText(text);
        copyBibtexBtn.textContent = 'Copied!';
        setTimeout(() => { copyBibtexBtn.innerHTML = '<i class="fas fa-copy"></i> Copy BibTeX'; }, 1200);
      } catch (e) {
        console.error('Copy failed', e);
      }
    });
  }

  const copyCitationBtnOnPage = document.getElementById('copyCitationBtnOnPage');
  if (copyCitationBtnOnPage) {
    copyCitationBtnOnPage.addEventListener('click', async () => {
      const text = document.getElementById('citation-text')?.innerText || '';
      try {
        await navigator.clipboard.writeText(text);
        const originalHTML = copyCitationBtnOnPage.innerHTML;
        copyCitationBtnOnPage.textContent = 'Copied!';
        setTimeout(() => { copyCitationBtnOnPage.innerHTML = '<i class="fas fa-copy"></i> Copy BibTeX'; }, 1200);
      } catch (e) {
        console.error('Copy failed', e);
      }
    });
  }
})();

