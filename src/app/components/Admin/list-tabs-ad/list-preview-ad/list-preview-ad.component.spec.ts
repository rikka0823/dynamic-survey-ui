import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreviewAdComponent } from './list-preview-ad.component';

describe('ListPreviewAdComponent', () => {
  let component: ListPreviewAdComponent;
  let fixture: ComponentFixture<ListPreviewAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPreviewAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPreviewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
