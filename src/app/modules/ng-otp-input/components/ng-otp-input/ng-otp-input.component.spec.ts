import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOtpInputComponent } from './ng-otp-input.component';

describe('NgOtpInputComponent', () => {
  let component: NgOtpInputComponent;
  let fixture: ComponentFixture<NgOtpInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgOtpInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
