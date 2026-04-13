import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearDetailPageComponent } from './gear-detail-page.component';

describe('GearDetailPageComponent', () => {
  let component: GearDetailPageComponent;
  let fixture: ComponentFixture<GearDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GearDetailPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
