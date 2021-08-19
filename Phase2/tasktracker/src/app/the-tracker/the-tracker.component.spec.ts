import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheTrackerComponent } from './the-tracker.component';

describe('TheTrackerComponent', () => {
  let component: TheTrackerComponent;
  let fixture: ComponentFixture<TheTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
