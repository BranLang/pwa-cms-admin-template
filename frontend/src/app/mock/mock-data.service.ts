import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MockDataService implements InMemoryDbService {
  createDb() {
    const db = {
      settings: {
        languages: ['sk', 'en'],
        title: {
          sk: 'Just Eurookna',
          en: 'Just Eurookna'
        },
        theme: 'light'
      },
      menu: [
        { id: 'home', path: '', i18nKey: 'menu.home' },
        { id: 'about', path: 'o-nas', i18nKey: 'menu.about', children: [
          { id: 'company', path: 'o-nas/o-spolocnosti', i18nKey: 'menu.about.company' },
          { id: 'services', path: 'o-nas/sluzby', i18nKey: 'menu.about.services' },
          { id: 'how', path: 'o-nas/ako-vyrabame', i18nKey: 'menu.about.how' },
          { id: 'certs', path: 'o-nas/certifikaty', i18nKey: 'menu.about.certs' }
        ]},
        { id: 'products', path: 'produkty', i18nKey: 'menu.products', children: [
          { id: 'windows', path: 'produkty/okna', i18nKey: 'menu.products.windows', children: [
            { id: 'wood', path: 'produkty/okna/drevene-okna', i18nKey: 'menu.products.windows.wood' },
            { id: 'wood-al', path: 'produkty/okna/drevohlinikove-okna', i18nKey: 'menu.products.windows.wood_al' },
            { id: 'al', path: 'produkty/okna/hlinikove-okna', i18nKey: 'menu.products.windows.al' },
            { id: 'historic-w', path: 'produkty/okna/historicke-okna', i18nKey: 'menu.products.windows.historic' }
          ]},
          { id: 'doors', path: 'produkty/dvere', i18nKey: 'menu.products.doors', children: [
            { id: 'wood-doors', path: 'produkty/dvere/drevene-dvere', i18nKey: 'menu.products.doors.wood' },
            { id: 'historic-doors', path: 'produkty/dvere/historicke-dvere', i18nKey: 'menu.products.doors.historic' },
            { id: 'al-doors', path: 'produkty/dvere/hlinikove-dvere', i18nKey: 'menu.products.doors.al' },
            { id: 'sliding-doors', path: 'produkty/dvere/posuvne-dvere', i18nKey: 'menu.products.doors.sliding' }
          ]},
          { id: 'addons', path: 'produkty/doplnky', i18nKey: 'menu.products.addons' }
        ]},
        { id: 'projects', path: 'realizacie', i18nKey: 'menu.projects', children: [
          { id: 'proj-wood', path: 'realizacie/drevene-okna', i18nKey: 'menu.projects.wood' },
          { id: 'proj-wood-al', path: 'realizacie/drevohlinikove-okna', i18nKey: 'menu.projects.wood_al' },
          { id: 'proj-al', path: 'realizacie/hlinikove-okna', i18nKey: 'menu.projects.al' },
          { id: 'proj-historic', path: 'realizacie/historicke-okna', i18nKey: 'menu.projects.historic' },
          { id: 'proj-doors', path: 'realizacie/vchodove-dvere', i18nKey: 'menu.projects.doors' },
          { id: 'proj-sliding', path: 'realizacie/posuvne-steny', i18nKey: 'menu.projects.sliding' }
        ]},
        { id: 'pricing', path: 'cenovy-dopyt', i18nKey: 'menu.pricing' },
        { id: 'articles', path: 'clanky', i18nKey: 'menu.articles', children: [
          { id: 'faq', path: 'clanky/caste-otazky', i18nKey: 'menu.articles.faq' },
          { id: 'choose', path: 'clanky/vyber-spravnych-okien', i18nKey: 'menu.articles.choose' },
          { id: 'maintenance', path: 'clanky/navod-na-udrzbu', i18nKey: 'menu.articles.maintenance' }
        ]},
        { id: 'contact', path: 'kontakt', i18nKey: 'menu.contact' }
      ],
      home: {
        carousel: [
          {
            id: 1,
            src: '/uploads/al-windows.jpg',
            alt: { sk: 'Dokonalá svetelná pohoda', en: 'Perfect daylight comfort' },
            caption: {
              sk: 'Dokonalá svetelná pohoda hliníkových okien s prepojením so záhradou',
              en: 'Perfect daylight comfort of aluminum windows connected to the garden'
            }
          },
          {
            id: 2,
            src: '/uploads/wood-windows.jpg',
            alt: { sk: 'Nezameniteľný domov s vôňou dreva', en: 'Unmistakable home with the scent of wood' },
            caption: {
              sk: 'Nezameniteľný, dokonalý domov s vôňou dreva',
              en: 'An unmistakable, perfect home with the scent of wood'
            }
          },
          {
            id: 3,
            src: '/uploads/entrance-doors.jpg',
            alt: { sk: 'Komfortné a bezpečné bývanie', en: 'Comfortable and secure living' },
            caption: {
              sk: 'Komfortné a bezpečné bývanie s osobitým akcentom',
              en: 'Comfortable and secure living with a distinctive accent'
            }
          }
        ],
        categories: [
          {
            id: 'cat-wood-windows',
            i18nKeyTitle: 'categories.wood_windows.title',
            i18nKeyDescription: 'categories.wood_windows.desc',
            image: '/uploads/wood-windows.jpg'
          },
          {
            id: 'cat-al-windows',
            i18nKeyTitle: 'categories.al_windows.title',
            i18nKeyDescription: 'categories.al_windows.desc',
            image: '/uploads/al-windows.jpg'
          },
          {
            id: 'cat-doors',
            i18nKeyTitle: 'categories.doors.title',
            i18nKeyDescription: 'categories.doors.desc',
            image: '/uploads/entrance-doors.jpg'
          }
        ]
      }
    };
    return db;
  }
}


