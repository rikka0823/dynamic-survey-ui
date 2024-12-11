import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeacchComponent } from './list-search.component';

describe('SurveyListComponent', () => {
  let component: ListSeacchComponent;
  let fixture: ComponentFixture<ListSeacchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSeacchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeacchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
