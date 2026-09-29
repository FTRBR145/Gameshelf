(function () {
  'use strict';

  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  function formatBytes(bytes) {
    const unit = bytes >= 1073741824 ? 'GiB' : 'MiB';
    const divisor = unit === 'GiB' ? 1073741824 : 1048576;
    return `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(bytes / divisor)} ${unit}`;
  }

  function element(tag, className, textContent) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (textContent !== undefined) node.textContent = textContent;
    return node;
  }

  function renderCatalog() {
    const grid = document.getElementById('game-grid');
    const count = document.getElementById('game-count');
    count.textContent = `${String(games.length).padStart(2, '0')} GAME TERSEDIA`;

    if (!games.length) {
      grid.append(element('p', 'notice', 'Belum ada game di katalog.'));
      return;
    }

    games.forEach((game, index) => {
      const article = element('article', 'game-card');
      const link = element('a', 'game-card-link');
      link.href = `./game.html?game=${encodeURIComponent(game.slug)}`;
      link.setAttribute('aria-label', `Lihat detail ${game.title}`);

      const image = element('img', 'game-card-image');
      image.src = game.artwork;
      image.alt = game.artworkAlt;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      link.append(image);
      link.append(element('span', 'card-shade'));

      const content = element('div', 'game-card-content');
      const meta = element('div', 'game-card-meta');
      meta.append(element('span', 'mini-pill', 'KOLEKSI ' + String(index + 1).padStart(2, '0')));
      meta.append(element('span', 'card-file-count', `${game.files.length} FILE TERSEDIA`));
      content.append(meta);
      content.append(element('p', 'game-card-subtitle', game.subtitle));
      content.append(element('h3', 'game-card-title', game.shortTitle));
      const bottom = element('div', 'game-card-bottom');
      bottom.append(element('span', '', 'Lihat detail game'));
      bottom.append(element('span', 'circle-arrow', '↗'));
      content.append(bottom);
      link.append(content);
      article.append(link);
      grid.append(article);
    });
  }

  function renderDetail() {
    const container = document.getElementById('detail-content');
    const slug = new URLSearchParams(window.location.search).get('game');
    const game = games.find((item) => item.slug === slug);

    if (!game) {
      document.title = 'Game tidak ditemukan — GameShelf';
      container.append(element('h1', 'not-found-title', 'Game tidak ditemukan.'));
      container.append(element('p', 'muted', 'Game ini belum tersedia di katalog.'));
      const back = element('a', 'button button-primary', 'Kembali ke katalog');
      back.href = './index.html#katalog';
      container.append(back);
      return;
    }

    document.title = `${game.title} — GameShelf`;
    document.querySelector('meta[name="description"]').content = `Unduh ${game.title}: part utama dan update melalui Google Drive.`;
    document.getElementById('breadcrumb-current').textContent = game.shortTitle;

    const hero = element('section', 'detail-hero');
    hero.setAttribute('aria-labelledby', 'game-title');
    const artwork = element('img', 'detail-hero-image');
    artwork.src = game.artwork;
    artwork.alt = game.artworkAlt;
    hero.append(artwork);
    hero.append(element('span', 'detail-hero-shade'));
    const heroCopy = element('div', 'detail-hero-copy');
    heroCopy.append(element('p', 'eyebrow detail-eyebrow', `GAME DETAIL / ${String(games.indexOf(game) + 1).padStart(3, '0')}`));
    heroCopy.append(element('p', 'detail-subtitle', game.subtitle));
    const title = element('h1', '', game.shortTitle);
    title.id = 'game-title';
    heroCopy.append(title);
    heroCopy.append(element('p', 'detail-full-title', game.title));
    hero.append(heroCopy);
    container.append(hero);

    const layout = element('div', 'detail-layout');
    const main = element('section', 'downloads');
    main.setAttribute('aria-labelledby', 'downloads-title');
    main.append(element('p', 'eyebrow section-eyebrow', 'FILE GAME'));
    const sectionTitle = element('h2', '', 'Pilih file unduhan');
    sectionTitle.id = 'downloads-title';
    main.append(sectionTitle);
    main.append(element('p', 'download-intro', 'Unduh kedua part utama terlebih dahulu. File update tersedia terpisah bila kamu memerlukannya.'));

    const list = element('ol', 'file-list');
    game.files.forEach((file, index) => {
      const item = element('li', 'file-card');
      const number = element('span', 'file-index', String(index + 1).padStart(2, '0'));
      item.append(number);
      const info = element('div', 'file-info');
      const row = element('div', 'file-title-row');
      row.append(element('h3', '', file.label));
      row.append(element('span', file.kind === 'update' ? 'file-kind is-update' : 'file-kind', file.kind === 'update' ? 'PEMBARUAN' : 'ARSIP UTAMA'));
      info.append(row);
      info.append(element('p', 'file-name', file.filename));
      info.append(element('span', 'file-size', formatBytes(file.sizeBytes)));
      item.append(info);
      const link = element('a', 'button button-download', 'Buka di Drive ↗');
      link.href = file.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Buka ${file.label} di Google Drive, tab baru`);
      item.append(link);
      list.append(item);
    });
    main.append(list);
    layout.append(main);

    const aside = element('aside', 'download-aside');
    aside.append(element('span', 'aside-symbol', '✦'));
    aside.append(element('p', 'eyebrow', 'CATATAN UNDUH'));
    aside.append(element('h2', '', 'Siap untuk mulai?'));
    aside.append(element('p', '', 'Simpan Part 1 dan Part 2 dalam folder yang sama. Tombol unduh akan membawamu ke halaman Google Drive untuk masing-masing file.'));
    const note = element('div', 'aside-note');
    note.append(element('span', 'note-dot'));
    note.append(element('span', '', 'File update 1.0.1 disediakan secara terpisah.'));
    aside.append(note);
    layout.append(aside);
    container.append(layout);

    const back = element('a', 'back-link', '← Kembali ke katalog');
    back.href = './index.html#katalog';
    container.append(back);
  }

  if (document.body.dataset.page === 'catalog') renderCatalog();
  if (document.body.dataset.page === 'detail') renderDetail();
})();
