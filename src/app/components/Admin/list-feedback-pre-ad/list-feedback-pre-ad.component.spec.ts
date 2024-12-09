import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackPreAdComponent } from './list-feedback-pre-ad.component';

describe('ListFeedbackPreAdComponent', () => {
  let component: ListFeedbackPreAdComponent;
  let fixture: ComponentFixture<ListFeedbackPreAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFeedbackPreAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedbackPreAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
