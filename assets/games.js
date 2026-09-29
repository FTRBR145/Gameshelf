/**
 * @typedef {{label: string, filename: string, sizeBytes: number, url: string, kind: 'main' | 'update'}} GameFile
 * @typedef {{slug: string, title: string, shortTitle: string, subtitle: string, artwork: string, artworkAlt: string, files: GameFile[]}} Game
 */

/** @type {Game[]} */
window.GAMES = [
  {
    slug: 'the-quintessential-quintuplets-five-promises-with-her',
    title: 'The Quintessential Quintuplets Five Promises With Her',
    shortTitle: 'Five Promises With Her',
    subtitle: 'The Quintessential Quintuplets',
    artwork: './assets/coastal-dusk.webp',
    artworkAlt: 'Ilustrasi orisinal suasana kota pesisir saat senja',
    files: [
      {
        label: 'Part 1',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76000][1.0.0][0][16.0.3][taodung.com].part1.rar',
        sizeBytes: 5368709120,
        url: 'https://drive.google.com/file/d/1pfZrELCGG_mXxaTM-_Ycahs17J_Te0QL/view?usp=drive_link',
        kind: 'main'
      },
      {
        label: 'Part 2',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76000][1.0.0][0][16.0.3][taodung.com].part2.rar',
        sizeBytes: 128616616,
        url: 'https://drive.google.com/file/d/1QAw5eras92pNSCcEoOjqfiZ1HEn5haxI/view?usp=drive_link',
        kind: 'main'
      },
      {
        label: 'Update 1.0.1',
        filename: 'The Quintessential Quintuplets Five Promises With Her[0100B77019F76800][Update File][1.0.1][65536][16.0.3][taodung.com].rar',
        sizeBytes: 170363186,
        url: 'https://drive.google.com/file/d/1KJwXiTnSwjyNBC9nhVoZ-8WI_ZrPNgPy/view?usp=drive_link',
        kind: 'update'
      }
    ]
  }
];
