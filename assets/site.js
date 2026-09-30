(function () {
  'use strict';

  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  function formatBytes(bytes) {
    const unit = bytes >= 1000000000 ? 'GB' : 'MB';
    const divisor = unit === 'GB' ? 1000000000 : 1000000;
    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(bytes / divisor)} ${unit}`;
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
    count.textContent = `${String(games.length).padStart(2, '0')} ${games.length === 1 ? 'GAME' : 'GAMES'} AVAILABLE`;

    if (!games.length) {
      grid.append(element('p', 'notice', 'No games are available yet.'));
      return;
    }

    games.forEach((game, index) => {
      const article = element('article', 'game-card');
      const link = element('a', 'game-card-link');
      link.href = `./game.html?game=${encodeURIComponent(game.slug)}`;
      link.setAttribute('aria-label', `View details for ${game.title}`);

      const art = element('div', 'game-card-art');
      const image = element('img', 'game-card-image');
      image.src = game.artwork;
      image.alt = game.artworkAlt;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      art.append(image);
      link.append(art);

      const content = element('div', 'game-card-content');
      const meta = element('div', 'game-card-meta');
      meta.append(element('span', 'mini-pill', 'COLLECTION ' + String(index + 1).padStart(2, '0')));
      meta.append(element('span', 'card-file-count', `${game.files.length} ${game.files.length === 1 ? 'FILE' : 'FILES'} AVAILABLE`));
      content.append(meta);
      content.append(element('p', 'game-card-subtitle', game.subtitle));
      content.append(element('h3', 'game-card-title', game.shortTitle));
      const bottom = element('div', 'game-card-bottom');
      bottom.append(element('span', '', 'View game details'));
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
      document.title = 'Game not found — GameShelf';
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.append(robots);
      container.append(element('h1', 'not-found-title', 'Game not found.'));
      container.append(element('p', 'muted', 'This game is not in the catalog yet.'));
      const back = element('a', 'button button-primary', 'Back to catalog');
      back.href = './index.html#catalog';
      container.append(back);
      return;
    }

    document.title = `${game.title} — GameShelf`;
    document.querySelector('meta[name="description"]').content = `${game.title}: Nintendo Switch visual novel files, sizes, and download notes on GameShelf.`;
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = new URL(`./game.html?game=${encodeURIComponent(game.slug)}`, window.location.href).href;
    document.head.append(canonical);
    document.getElementById('breadcrumb-current').textContent = game.shortTitle;
    const mainFileCount = game.files.filter((file) => file.kind === 'main').length;
    const extraFiles = game.files.filter((file) => file.kind !== 'main');

    const hero = element('section', 'detail-hero');
    hero.setAttribute('aria-labelledby', 'game-title');
    const artwork = element('img', 'detail-hero-image');
    artwork.src = game.artwork;
    artwork.alt = game.artworkAlt;
    hero.append(artwork);
    hero.append(element('span', 'detail-hero-shade'));
    const heroCopy = element('div', 'detail-hero-copy');
    heroCopy.append(element('p', 'eyebrow detail-eyebrow', `GAME DETAILS / ${String(games.indexOf(game) + 1).padStart(3, '0')}`));
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
    main.append(element('p', 'eyebrow section-eyebrow', 'GAME FILES'));
    const sectionTitle = element('h2', '', 'Download files');
    sectionTitle.id = 'downloads-title';
    main.append(sectionTitle);
    main.append(element('p', 'download-intro', mainFileCount > 1
      ? 'Download every main part first and keep them in the same folder. Updates are listed separately.'
      : extraFiles.length
        ? 'Download the main archive first. Additional files are listed separately.'
        : 'One game archive is available. Open its download link to continue.'));

    const list = element('ol', 'file-list');
    game.files.forEach((file, index) => {
      const item = element('li', 'file-card');
      const number = element('span', 'file-index', String(index + 1).padStart(2, '0'));
      item.append(number);
      const info = element('div', 'file-info');
      const row = element('div', 'file-title-row');
      row.append(element('h3', '', file.label));
      row.append(element('span', file.kind === 'main' ? 'file-kind' : 'file-kind is-update', file.kind === 'main' ? 'MAIN ARCHIVE' : file.kind.toUpperCase()));
      info.append(row);
      info.append(element('p', 'file-name', file.filename));
      info.append(element('span', 'file-size', formatBytes(file.sizeBytes)));
      item.append(info);
      const link = element('a', 'button button-download', 'Open download link ↗');
      link.href = file.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Open ${file.label} download link, new tab`);
      item.append(link);
      list.append(item);
    });
    main.append(list);
    layout.append(main);

    const aside = element('aside', 'download-aside');
    aside.append(element('span', 'aside-symbol', '✦'));
    aside.append(element('p', 'eyebrow', 'DOWNLOAD NOTE'));
    aside.append(element('h2', '', 'Ready to begin?'));
    aside.append(element('p', '', mainFileCount > 1
      ? 'Keep all main parts in the same folder. Download buttons open external pages in new tabs; short links may require a CAPTCHA.'
      : 'Download buttons open external pages in new tabs; short links may require a CAPTCHA.'));
    aside.append(element('p', '', 'This is a Nintendo Switch game. Playing on a PC requires a compatible emulator; I use Ryujinx.'));
    extraFiles.forEach((file) => {
      const note = element('div', 'aside-note');
      note.append(element('span', 'note-dot'));
      note.append(element('span', '', `${file.label} is provided separately.`));
      aside.append(note);
    });
    layout.append(aside);
    container.append(layout);

    const back = element('a', 'back-link', '← Back to catalog');
    back.href = './index.html#catalog';
    container.append(back);
  }

  if (document.body.dataset.page === 'catalog') renderCatalog();
  if (document.body.dataset.page === 'detail') renderDetail();
})();
