import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PausePopupComponent } from './pause-popup.component';

describe('PausePopupComponent', () => {
  let component: PausePopupComponent;
  let fixture: ComponentFixture<PausePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PausePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PausePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
