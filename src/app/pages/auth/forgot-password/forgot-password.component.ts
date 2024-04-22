import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../@core/services/security/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  entityForm: FormGroup;
  toReset: boolean = false;
  username: string;
  success: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService,
              public translateService: TranslateService) {
    this.entityForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  reset() {
    this.submitted = true;
    this.username = this.entityForm.controls.username?.value || null;
    const item = {'username': this.username};
    let user = {};
    if(this.entityForm.controls.username.errors?.username == null) {
      this.authService.forgotPassword(item).subscribe((res: any) => {
      if (res) {
        Object.assign(user, {username: this.username}, {code: res});
        localStorage.setItem('user_code', JSON.stringify(user));
       // this.toastrService.success('Inserisci il codice che è stato inviato via email.', 'Informazione')
        this.router.navigate(['/auth/reset-password']).then();
      }
    });
    }
  }

  back() {
    this.router.navigate(['./auth']);
  }
}
