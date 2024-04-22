import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../@core/services/security/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  entityForm: FormGroup;
  success: boolean = false;
  submitted: boolean = false;
  test_code: string = '';
  user_code: any;
  debug_mode: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService) {
    this.entityForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    },
      {
        validator: ConfirmPasswordValidator("password", "repeatPassword")
      }
    );
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user_code');
    this.user_code = JSON.parse(user);
    this.test_code = this.user_code.code;
    this.debug_mode = environment.debugMode;
  }

  onSubmit() {
    this.submitted = true;
    let username = this.user_code?.username;
    const codice = this.entityForm.controls.code?.value || null;
    const password = this.entityForm.controls.password?.value || null;
    const ripetiPassword = this.entityForm.controls.repeatPassword?.value || null;
    const item = { username, password, ripetiPassword, codice }
    if (this.entityForm.controls.code.errors == null && this.entityForm.controls.password.errors == null
      && this.entityForm.controls.repeatPassword.errors == null) {
      this.authService.resetPassword(item).subscribe(res => {
        console.log
        this.router.navigate(['/auth']);
      })
    }
  }

}

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
