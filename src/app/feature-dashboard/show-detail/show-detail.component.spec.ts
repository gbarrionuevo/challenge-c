import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { of } from 'rxjs';
import { ShowDetailComponent } from './show-detail.component';

describe('ShowDetailComponent', () => {
  let component: ShowDetailComponent;
  let fixture: ComponentFixture<ShowDetailComponent>;
  let mockTvshowsService: { getShowDetails: any; };
  let mockActivatedRoute;
  let mockRouter: { navigate: any; };

  beforeEach(async () => {
    mockTvshowsService = {
      getShowDetails: jasmine.createSpy('getShowDetails').and.returnValue(of({ name: 'Test Show' }))
    };

    mockActivatedRoute = {
      snapshot: {
        params: { id: '123' }
      }
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ShowDetailComponent],
      providers: [
        { provide: TvshowsService, useValue: mockTvshowsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch show details on initialization', () => {
    expect(mockTvshowsService.getShowDetails).toHaveBeenCalledWith(123);
    expect(component.details.name).toEqual('Test Show');
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../']);
  });
});
