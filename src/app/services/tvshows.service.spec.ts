import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TvshowsService } from './tvshows.service';

describe('TvshowsService', () => {
  let service: TvshowsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvshowsService]
    });

    service = TestBed.inject(TvshowsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve shows without query', () => {
    const mockShows: string | number | boolean | Object | null = [];

    service.getShows().subscribe(shows => {
      expect(shows.length).toBe(0);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/shows`);
    expect(req.request.method).toBe('GET');
    req.flush(mockShows);
  });

  it('should retrieve shows with query', () => {
    const mockShows: string | number | boolean | Object | null = [];
    const query = 'breaking';

    service.getShows(query).subscribe(shows => {
      expect(shows.length).toBe(0);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/search/shows?q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockShows);
  });

  it('should retrieve show details', () => {
    const mockShowDetails = {};
    const id = 123;

    service.getShowDetails(id).subscribe(details => {
      expect(details).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiBase}/shows/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockShowDetails);
  });
});
