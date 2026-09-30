/**
 * @typedef {{label: string, filename: string, sizeBytes: number, url: string, kind: 'main' | 'update' | 'patch'}} GameFile
 * @typedef {{slug: string, title: string, shortTitle: string, subtitle: string, artwork: string, artworkAlt: string, files: GameFile[]}} Game
 */

/** @type {Game[]} */
window.GAMES = [
  {
    slug: 'the-quintessential-quintuplets-five-promises-with-her',
    title: 'The Quintessential Quintuplets Five Promises With Her',
    shortTitle: 'Five Promises With Her',
    subtitle: 'The Quintessential Quintuplets',
    artwork: './assets/game-cover.png',
    artworkAlt: 'Game cover featuring five characters by the waterfront',
    files: [
      {
        label: 'Part 1',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76000][1.0.0][0][16.0.3][taodung.com].part1.rar',
        sizeBytes: 5368709120,
        url: 'https://shrinkme.click/TQQ-Five-Promises-With-Her_1',
        kind: 'main'
      },
      {
        label: 'Part 2',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76000][1.0.0][0][16.0.3][taodung.com].part2.rar',
        sizeBytes: 128616616,
        url: 'https://shrinkme.click/TQQ-Five-Promises-With-Her_2',
        kind: 'main'
      },
      {
        label: 'Update 1.0.1',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76800][Update File][1.0.1][65536][16.0.3][taodung.com].rar',
        sizeBytes: 170363186,
        url: 'https://shrinkme.click/TQQ-Five-Promises-With-Her_upd',
        kind: 'update'
      }
    ]
  },
  {
    slug: '5toubun-no-princess',
    title: '5toubun no Princess: Gensou to Shinen to Mahou Gakuin',
    shortTitle: '5toubun no Princess',
    subtitle: 'Gensou to Shinen to Mahou Gakuin',
    artwork: './assets/princess-cover.png',
    artworkAlt: 'Game cover showing five characters in academy uniforms',
    files: [
      {
        label: 'Game archive',
        filename: '5toubun no Princess -Gensou to Shinen to Mahou Gakuin- (XCI).rar',
        sizeBytes: 3191149706,
        url: 'https://shrinkme.click/TQQ-No-Princess',
        kind: 'main'
      }
    ]
  },
  {
    slug: 'yahari-game-demo-oregairu-kan',
    title: 'Yahari Game demo Ore no Seishun Love Come wa Machigatteiru. Kan',
    shortTitle: 'OreGairu Kan',
    subtitle: 'Yahari Game demo Ore no Seishun Love Come wa Machigatteiru.',
    artwork: './assets/oregairu-kan-cover.png',
    artworkAlt: 'Cover showing three school students beneath cherry blossoms',
    files: [
      {
        label: 'Game archive',
        filename: 'After all, even in games, my youth romantic comedy is wrong. finish [010066801A138000][JP][v0] [taodung.com].rar',
        sizeBytes: 1192926163,
        url: 'https://shrinkme.click/OreGairu-Kan',
        kind: 'main'
      },
      {
        label: 'Update',
        filename: 'After all even in games my youth romantic comedy is wrong. finish [010066801A138800][v65536][JP] [taodung.com].rar',
        sizeBytes: 284863443,
        url: 'https://shrinkme.click/OreGairu-Kan-UPD',
        kind: 'update'
      },
      {
        label: 'English patch',
        filename: 'oregairu.kan.switch.english-patch.7z',
        sizeBytes: 17450117,
        url: 'https://shrinkme.click/OreGairu-Kan-ENG',
        kind: 'patch'
      }
    ]
  }
];
