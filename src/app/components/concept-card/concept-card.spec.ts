import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConceptCard } from './concept-card';

describe('ConceptCard', () => {
  let component: ConceptCard;
  let fixture: ComponentFixture<ConceptCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ConceptCard);
    component = fixture.componentInstance;

    // Set required inputs
    component.icon = '🏪';
    component.title = 'Test Concept';
    component.description = 'Test description';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display icon, title, and description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.concept-icon')?.textContent).toContain('🏪');
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Concept');
    expect(compiled.querySelector('.concept-description')?.textContent).toContain('Test description');
  });

  it('should display code block when code is provided', () => {
    component.code = 'const test = "example";';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-code-block')).toBeTruthy();
  });

  it('should not display code block when code is not provided', () => {
    component.code = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-code-block')).toBeFalsy();
  });

  it('should display key points when provided', () => {
    component.keyPointsTitle = 'Features:';
    component.keyPoints = ['Feature 1', 'Feature 2', 'Feature 3'];
    fixture.detectChanges();

    const keyPoints = fixture.nativeElement.querySelector('.key-points');
    expect(keyPoints).toBeTruthy();
    expect(keyPoints.querySelector('h4')?.textContent).toContain('Features:');

    const listItems = keyPoints.querySelectorAll('li');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toContain('Feature 1');
  });

  it('should not display key points section when keyPoints is empty', () => {
    component.keyPoints = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.key-points')).toBeFalsy();
  });
});
