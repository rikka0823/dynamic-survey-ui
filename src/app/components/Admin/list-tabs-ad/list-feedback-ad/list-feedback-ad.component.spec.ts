import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFeedbackAdComponent } from './list-feedback-ad.component';


describe('ListFeedbackAdComponent', () => {
  let component: ListFeedbackAdComponent;
  let fixture: ComponentFixture<ListFeedbackAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFeedbackAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedbackAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
