import { TestBed } from '@angular/core/testing';
import { ApiService, SettingsResponse, MenuItemResponse, HomeResponse } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get settings', (done) => {
    const mockSettings: SettingsResponse = {
      languages: ['sk', 'en'],
      title: {
        sk: 'Just Eurookna',
        en: 'Just Eurookna'
      },
      theme: 'light'
    };

    service.getSettings().subscribe(settings => {
      expect(settings).toEqual(mockSettings);
      done();
    });

    const req = httpMock.expectOne('/api/settings');
    expect(req.request.method).toBe('GET');
    req.flush(mockSettings);
  });

  it('should get menu items', (done) => {
    const mockMenu: MenuItemResponse[] = [
      { id: 'home', path: '', i18nKey: 'menu.home' },
      { id: 'about', path: 'o-nas', i18nKey: 'menu.about', children: [] }
    ];

    service.getMenu().subscribe(menu => {
      expect(menu).toEqual(mockMenu);
      done();
    });

    const req = httpMock.expectOne('/api/menu');
    expect(req.request.method).toBe('GET');
    req.flush(mockMenu);
  });

  it('should get home data', (done) => {
    const mockHome: HomeResponse = {
      carousel: [
        {
          id: 1,
          src: '/uploads/homepage_1-2.jpg',
          alt: { sk: 'Test Alt 1', en: 'Test Alt 1 EN' },
          caption: { sk: 'Test Caption 1', en: 'Test Caption 1 EN' },
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
        }
      ]
    };

    service.getHome().subscribe(home => {
      expect(home).toEqual(mockHome);
      done();
    });

    const req = httpMock.expectOne('/api/home');
    expect(req.request.method).toBe('GET');
    req.flush(mockHome);
  });
});
