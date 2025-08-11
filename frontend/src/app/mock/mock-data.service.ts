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
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/01-DREVO-HLINIK-TITAN.jpg',
            alt: { 
              sk: 'Dokonalá svetelná pohoda hliníkových okien s prepojením so záhradou', 
              en: 'Perfect daylight comfort of aluminum windows connected to the garden' 
            },
            caption: {
              sk: 'Dokonalá svetelná pohoda hliníkových okien s prepojením so záhradou',
              en: 'Perfect daylight comfort of aluminum windows connected to the garden'
            },
            width: 1200,
            height: 500
          },
          {
            id: 2,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/02-DREVO-CLASSIC-scaled.jpg',
            alt: { 
              sk: 'Nezameniteľný, dokonalý domov s vôňou dreva', 
              en: 'Unmistakable, perfect home with the scent of wood' 
            },
            caption: {
              sk: 'Nezameniteľný, dokonalý domov s vôňou dreva',
              en: 'An unmistakable, perfect home with the scent of wood'
            },
            width: 1200,
            height: 500
          },
          {
            id: 3,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/03-DREVO-HISTORIC-scaled.jpg',
            alt: { 
              sk: 'Komfortné a bezpečné bývanie s osobitým akcentom', 
              en: 'Comfortable and secure living with a distinctive accent' 
            },
            caption: {
              sk: 'Komfortné a bezpečné bývanie s osobitým akcentom',
              en: 'Comfortable and secure living with a distinctive accent'
            },
            width: 1200,
            height: 500
          },
          {
            id: 4,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/04-DREVO-HLINIK-CLASSIC-scaled.jpg',
            alt: { 
              sk: 'Energeticky úsporný domov s funkčnými oknami', 
              en: 'Energy efficient home with functional windows' 
            },
            caption: {
              sk: 'Energeticky úsporný domov s funkčnými oknami',
              en: 'Energy efficient home with functional windows'
            },
            width: 1200,
            height: 500
          },
          {
            id: 5,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/05-DREVO-HLINIK-MODERN-scaled.jpg',
            alt: { 
              sk: 'Veľkorysý výhľad spája interiér s exteriérom', 
              en: 'Generous view connects interior with exterior' 
            },
            caption: {
              sk: 'Veľkorysý výhľad spája interiér s exteriérom',
              en: 'Generous view connects interior with exterior'
            },
            width: 1200,
            height: 500
          },
          {
            id: 6,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/06-DREVO-HLINIK-HISTORIC-scaled.jpg',
            alt: { 
              sk: 'Okná Vášho domova – kvalita, estetika, funkčný dizajn', 
              en: 'Windows of your home – quality, aesthetics, functional design' 
            },
            caption: {
              sk: 'Okná Vášho domova – kvalita, estetika, funkčný dizajn',
              en: 'Windows of your home – quality, aesthetics, functional design'
            },
            width: 1200,
            height: 500
          },
          {
            id: 7,
            src: 'https://just-eurookna.sk/wp-content/uploads/2022/11/07-DREVO-HLINIK-TITAN-MODERN-scaled.jpg',
            alt: { 
              sk: 'Dialóg moderných materiálov v modernej stavbe', 
              en: 'Dialogue of modern materials in modern construction' 
            },
            caption: {
              sk: 'Dialóg moderných materiálov v modernej stavbe',
              en: 'Dialogue of modern materials in modern construction'
            },
            width: 1200,
            height: 500
          }
        ],
        categories: [
          {
            id: 'windows',
            i18nKeyTitle: 'categories.windows.title',
            i18nKeyDescription: 'categories.windows.desc',
            image: 'https://just-eurookna.sk/wp-content/uploads/2023/04/drevene-okna-1.jpg',
            width: 400,
            height: 200
          },
          {
            id: 'doors',
            i18nKeyTitle: 'categories.doors.title',
            i18nKeyDescription: 'categories.doors.desc',
            image: 'https://just-eurookna.sk/wp-content/uploads/2023/04/hlinikove-dvere-1.jpg',
            width: 400,
            height: 200
          },
          {
            id: 'projects',
            i18nKeyTitle: 'categories.projects.title',
            i18nKeyDescription: 'categories.projects.desc',
            image: 'https://just-eurookna.sk/wp-content/uploads/2022/11/05-DREVO-HLINIK-MODERN-scaled.jpg',
            width: 400,
            height: 200
          }
        ]
      }
    };
    return db;
  }
}


