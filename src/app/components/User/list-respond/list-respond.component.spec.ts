import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRespondComponent } from './list-respond.component';

describe('ListRespondComponent', () => {
  let component: ListRespondComponent;
  let fixture: ComponentFixture<ListRespondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRespondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
