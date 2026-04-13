import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearListPage } from './gear-list-page.component';

describe('GearListPage', () => {
  let component: GearListPage;
  let fixture: ComponentFixture<GearListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GearListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
