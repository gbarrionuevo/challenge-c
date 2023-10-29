import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IonicModule.forRoot(), FormsModule, ThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize themeToggle based on color scheme preference', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    expect(component.themeToggle).toEqual(prefersDark.matches);
  });

  it('should update body class on toggleChange', () => {
    const event = { detail: { checked: true } };
    component.toggleChange(event);
    expect(document.body.classList.contains('dark')).toBeTrue();

    const event2 = { detail: { checked: false } };
    component.toggleChange(event2);
    expect(document.body.classList.contains('dark')).toBeFalse();
  });

  // You can also add more tests for other functionalities if needed
});
