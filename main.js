(function(){
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu(){
    if(!mobileMenu) return;
    mobileMenu.style.display = 'none';
    menuBtn?.setAttribute('aria-expanded', 'false');
  }
  menuBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Quote form -> mailto (no backend)
  const form = document.getElementById('quoteForm');
  const hint = document.getElementById('formHint');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const phone = data.get('phone');
    const company = data.get('company');
    const site = data.get('site');
    const product = data.get('product');
    const qty = data.get('qty');
    const due = data.get('due');
    const message = data.get('message');

    const subject = encodeURIComponent('[태멘] 견적/상담 문의');
    const body = encodeURIComponent(
`이름: ${name}
연락처: ${phone}
회사/현장: ${company || '-'}
현장 위치: ${site || '-'}
관심 제품: ${product || '-'}
수량/규격: ${qty || '-'}
희망 납기: ${due || '-'}

문의 내용:
${message}`
    );

    const to = document.documentElement.dataset.contactEmail || 'tae-men@naver.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    if(hint) hint.textContent = '메일 앱이 열리면 전송만 눌러주세요. (수신 이메일은 설정에서 변경 가능)';
  });
})();


// ===== HERO SLIDER (2~3장 자동 전환) =====
(function(){
  const hero = document.querySelector('.hero');
  if(!hero) return;

  const images = [
    'assets/hero-1.jpg',
    'assets/hero-2.jpg',
    'assets/hero-3.jpg'
  ];

  let idx = 0;
  function setHeroBg(src){
    document.documentElement.style.setProperty('--hero-bg', `url('${src}')`);
  }

  setHeroBg(images[idx]);

  setInterval(() => {
    idx = (idx + 1) % images.length;
    setHeroBg(images[idx]);
  }, 5500);
})();


// ===== GALLERY LIGHTBOX (클릭하면 크게 보기) =====
(function(){
  const cards = document.querySelectorAll('.galleryCard');
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');

  if(!cards.length || !box || !img || !closeBtn) return;

  function open(src){
    img.src = src;
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
  }

  function close(){
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    img.src = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-full') || card.querySelector('img')?.src;
      if(src) open(src);
    });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e) => {
    if(e.target === box) close();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();



// ===== SPEC MODAL SLIDER (규격/도면 자료) =====
(function(){
  const modal = document.getElementById('specModal');
  const closeBtn = document.getElementById('specModalClose');
  const titleEl = document.getElementById('specModalTitle');
  const descEl = document.getElementById('specModalDesc');
  const imgEl = document.getElementById('specSlideImg');
  const prevBtn = document.getElementById('specPrev');
  const nextBtn = document.getElementById('specNext');
  const dotsEl = document.getElementById('specDots');

  const cards = document.querySelectorAll('.specCard');
  if(!modal || !closeBtn || !titleEl || !imgEl || !prevBtn || !nextBtn || !dotsEl || !cards.length) return;

  const sets = {
    spec500: {
      title: '규격/도면 자료 · 500 × 500',
      desc: '사진은 추후 업데이트 예정입니다. (현재는 플레이스홀더)',
      images: ['assets/spec-500-1.svg','assets/spec-500-2.svg','assets/spec-500-3.svg']
    },
    spec730: {
      title: '규격/도면 자료 · 730 × 2,200',
      desc: '사진은 추후 업데이트 예정입니다. (현재는 플레이스홀더)',
      images: ['assets/spec-730-1.svg','assets/spec-730-2.svg']
    },
    specDetail: {
      title: '규격/도면 자료 · 배수판 상세도',
      desc: '사진은 추후 업데이트 예정입니다. (현재는 플레이스홀더)',
      images: ['assets/spec-detail-1.svg','assets/spec-detail-2.svg','assets/spec-detail-3.svg']
    }
  };

  let current = { key: null, idx: 0, images: [] };

  function renderDots(){
    dotsEl.innerHTML = '';
    current.images.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot' + (i === current.idx ? ' active' : '');
      b.setAttribute('aria-label', `슬라이드 ${i+1}`);
      b.addEventListener('click', () => go(i));
      dotsEl.appendChild(b);
    });
  }

  function go(i){
    if(!current.images.length) return;
    current.idx = (i + current.images.length) % current.images.length;
    const src = current.images[current.idx];
    imgEl.src = src;
    imgEl.alt = titleEl.textContent + ` (${current.idx+1}/${current.images.length})`;
    Array.from(dotsEl.children).forEach((d, di) => d.classList.toggle('active', di === current.idx));
  }

  function open(key){
    const set = sets[key];
    if(!set) return;
    current.key = key;
    current.images = set.images;
    current.idx = 0;
    titleEl.textContent = set.title;
    descEl.textContent = set.desc;
    renderDots();
    go(0);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function close(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
    dotsEl.innerHTML = '';
    current = { key: null, idx: 0, images: [] };
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-spec-set');
      open(key);
    });
  });

  prevBtn.addEventListener('click', () => go(current.idx - 1));
  nextBtn.addEventListener('click', () => go(current.idx + 1));
  closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if(e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();
