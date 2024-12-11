import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogInAdComponent } from './list-log-in-ad.component';

describe('ListLogInComponent', () => {
  let component: ListLogInAdComponent;
  let fixture: ComponentFixture<ListLogInAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLogInAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLogInAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
