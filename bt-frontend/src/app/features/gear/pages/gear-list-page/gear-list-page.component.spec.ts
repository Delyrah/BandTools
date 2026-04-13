import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearListPageComponent } from './gear-list-page.component';

describe('GearListPageComponent', () => {
  let component: GearListPageComponent;
  let fixture: ComponentFixture<GearListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GearListPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
