import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingComponent } from './listing.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TvshowsService } from 'src/app/services/tvshows.service';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let tvshowsServiceSpy: jasmine.SpyObj<TvshowsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TvshowsService', ['getShows']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ListingComponent],
      providers: [
        { provide: TvshowsService, useValue: spy },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;

    tvshowsServiceSpy = TestBed.inject(TvshowsService) as jasmine.SpyObj<TvshowsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch shows on initialization', () => {
    tvshowsServiceSpy.getShows.and.returnValue(of([{ id: '1', score: 1, rating: { average: 9 }, genres: ['Drama'] }]));
    component.ngOnInit();
    expect(tvshowsServiceSpy.getShows.calls.count()).toBe(1, 'spy method was called once');
    expect(component.allShows.length).toBe(1);
  });
});
