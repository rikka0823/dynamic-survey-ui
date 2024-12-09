import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicAdComponent } from './list-topic-ad.component';

describe('ListTopicAdComponent', () => {
  let component: ListTopicAdComponent;
  let fixture: ComponentFixture<ListTopicAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTopicAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTopicAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
