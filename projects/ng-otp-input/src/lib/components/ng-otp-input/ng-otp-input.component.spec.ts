import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysPipe } from 'ng-otp-input/src/lib/pipes/keys.pipe';
import { ReactiveFormsModule } from '@angular/forms';

import { NgOtpInputComponent } from './ng-otp-input.component';

describe('NgOtpInputComponent', () => {
  let component: NgOtpInputComponent;
  let fixture: ComponentFixture<NgOtpInputComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
        declarations: [NgOtpInputComponent, KeysPipe],
        providers: [KeysPipe],
        imports: [ReactiveFormsModule]
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
