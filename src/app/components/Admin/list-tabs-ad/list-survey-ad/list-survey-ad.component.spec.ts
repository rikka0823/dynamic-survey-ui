import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSurveyAdComponent } from './list-survey-ad.component';

describe('ListSurveyAdComponent', () => {
  let component: ListSurveyAdComponent;
  let fixture: ComponentFixture<ListSurveyAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSurveyAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSurveyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
