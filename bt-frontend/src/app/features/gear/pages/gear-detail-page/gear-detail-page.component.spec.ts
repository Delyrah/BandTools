import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearDetailPage } from './gear-detail-page.component';

describe('GearDetailPage', () => {
  let component: GearDetailPage;
  let fixture: ComponentFixture<GearDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GearDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
