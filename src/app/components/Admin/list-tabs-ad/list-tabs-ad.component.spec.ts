import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabsAdComponent } from './list-tabs-ad.component';

describe('ListTabsAdComponent', () => {
  let component: ListTabsAdComponent;
  let fixture: ComponentFixture<ListTabsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTabsAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTabsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
