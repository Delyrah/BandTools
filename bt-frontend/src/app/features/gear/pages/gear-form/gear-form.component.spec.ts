import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearFormComponent } from './gear-form.component';

describe('GearFormComponent', () => {
  let component: GearFormComponent;
  let fixture: ComponentFixture<GearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GearFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
