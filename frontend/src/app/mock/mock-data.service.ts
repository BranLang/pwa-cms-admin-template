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
            src: '/uploads/homepage_1-2.jpg',
            alt: { 
              sk: 'Dokonalá svetelná pohoda hliníkových okien s prepojením so záhradou', 
              en: 'Perfect daylight comfort of aluminum windows connected to the garden' 
            },
            caption: {
              sk: 'Dokonalá svetelná pohoda hliníkových okien s prepojením so záhradou',
              en: 'Perfect daylight comfort of aluminum windows connected to the garden'
            },
            width: 1200,
            height: 400
          },
          {
            id: 2,
            src: '/uploads/homepage_2-2.jpg',
            alt: { 
              sk: 'Nezameniteľný, dokonalý domov s vôňou dreva', 
              en: 'Unmistakable, perfect home with the scent of wood' 
            },
            caption: {
              sk: 'Nezameniteľný, dokonalý domov s vôňou dreva',
              en: 'An unmistakable, perfect home with the scent of wood'
            },
            width: 1200,
            height: 400
          },
          {
            id: 3,
            src: '/uploads/homepage_3-2.jpg',
            alt: { 
              sk: 'Komfortné a bezpečné bývanie s osobitým akcentom', 
              en: 'Comfortable and secure living with a distinctive accent' 
            },
            caption: {
              sk: 'Komfortné a bezpečné bývanie s osobitým akcentom',
              en: 'Comfortable and secure living with a distinctive accent'
            },
            width: 1200,
            height: 400
          },
          {
            id: 4,
            src: '/uploads/homepage_4-2.jpg',
            alt: { 
              sk: 'Energeticky úsporný domov s funkčnými oknami', 
              en: 'Energy efficient home with functional windows' 
            },
            caption: {
              sk: 'Energeticky úsporný domov s funkčnými oknami',
              en: 'Energy efficient home with functional windows'
            },
            width: 1200,
            height: 400
          },
          {
            id: 5,
            src: '/uploads/homepage_5-2.jpg',
            alt: { 
              sk: 'Veľkorysý výhľad spája interiér s exteriérom', 
              en: 'Generous view connects interior with exterior' 
            },
            caption: {
              sk: 'Veľkorysý výhľad spája interiér s exteriérom',
              en: 'Generous view connects interior with exterior'
            },
            width: 1200,
            height: 400
          },
          {
            id: 6,
            src: '/uploads/homepage_7-2.jpg',
            alt: { 
              sk: 'Okná Vášho domova – kvalita, estetika, funkčný dizajn', 
              en: 'Windows of your home – quality, aesthetics, functional design' 
            },
            caption: {
              sk: 'Okná Vášho domova – kvalita, estetika, funkčný dizajn',
              en: 'Windows of your home – quality, aesthetics, functional design'
            },
            width: 1200,
            height: 400
          },
          {
            id: 7,
            src: '/uploads/homepage_8-2.jpg',
            alt: { 
              sk: 'Dialóg moderných materiálov v modernej stavbe', 
              en: 'Dialogue of modern materials in modern construction' 
            },
            caption: {
              sk: 'Dialóg moderných materiálov v modernej stavbe',
              en: 'Dialogue of modern materials in modern construction'
            },
            width: 1200,
            height: 400
          }
        ],
        categories: [
          {
            id: 'windows',
            i18nKeyTitle: 'categories.windows.title',
            i18nKeyDescription: 'categories.windows.desc',
            image: '/uploads/homeblock-drevene-okna.jpg',
            width: 1200,
            height: 634
          },
          {
            id: 'doors',
            i18nKeyTitle: 'categories.doors.title',
            i18nKeyDescription: 'categories.doors.desc',
            image: '/uploads/homeblock-hlinikove-systemy.jpg',
            width: 1200,
            height: 634
          },
          {
            id: 'projects',
            i18nKeyTitle: 'categories.projects.title',
            i18nKeyDescription: 'categories.projects.desc',
            image: '/uploads/homepage_5-2.jpg',
            width: 1200,
            height: 400
          }
        ]
      },
      projects: [
        {
          id: '1',
          title: { sk: 'Projekt 1', en: 'Project 1' },
          description: { sk: 'Popis projektu 1', en: 'Description of project 1' },
          image: '/uploads/homepage_1-2.jpg',
          width: 1200,
          height: 400
        },
        {
          id: '2',
          title: { sk: 'Projekt 2', en: 'Project 2' },
          description: { sk: 'Popis projektu 2', en: 'Description of project 2' },
          image: '/uploads/homepage_2-2.jpg',
          width: 1200,
          height: 400
        },
        {
          id: '3',
          title: { sk: 'Projekt 3', en: 'Project 3' },
          description: { sk: 'Popis projektu 3', en: 'Description of project 3' },
          image: '/uploads/homepage_3-2.jpg',
          width: 1200,
          height: 400
        },
        {
          id: '4',
          title: { sk: 'Projekt 4', en: 'Project 4' },
          description: { sk: 'Popis projektu 4', en: 'Description of project 4' },
          image: '/uploads/homepage_4-2.jpg',
          width: 1200,
          height: 400
        }
      ],
      articles: [
        {
          id: '1',
          title: { sk: 'Časté otázky', en: 'Frequently Asked Questions' },
          snippet: { sk: 'Odpovede na najčastejšie otázky našich zákazníkov.', en: 'Answers to the most common questions from our customers.' },
          image: '/uploads/homepage_5-2.jpg',
          width: 1200,
          height: 400
        },
        {
          id: '2',
          title: { sk: 'Výber správnych okien a dverí', en: 'Choosing the right windows and doors' },
          snippet: { sk: 'Ako si vybrať tie správne okná a dvere pre váš domov.', en: 'How to choose the right windows and doors for your home.' },
          image: '/uploads/homepage_7-2.jpg',
          width: 1200,
          height: 400
        },
        {
          id: '3',
          title: { sk: 'Návod na údržbu a ošetrovanie', en: 'Maintenance and care instructions' },
          snippet: { sk: 'Ako sa starať o vaše nové okná a dvere, aby vám dlho vydržali.', en: 'How to care for your new windows and doors to make them last.' },
          image: '/uploads/homepage_8-2.jpg',
          width: 1200,
          height: 400
        }
      ]
    };
    return db;
  }
}


