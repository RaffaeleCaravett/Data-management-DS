import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../@core/services/security/auth.service';
import { StorageService } from '../../../@core/services/security/storage.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  entityForm: FormGroup;
  isLoggedIn: boolean = false;
  roles: string[] = [];
  submitted: boolean = false;
  version:string


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastrService: ToastrService,) {

  }

  ngOnInit(): void {



this.version=this.authService.getVersionNumber()

    this.entityForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit() {
    this.submitted = true;
    const username: string = this.entityForm.controls.username?.value || null;
    const password: string = this.entityForm.controls.password?.value || null;
    if(this.entityForm.controls.password.errors == null && this.entityForm.controls.username.errors == null) {
      this.authService.login(username, password).subscribe(res => {
      if (res) {
        this.storageService.setToken(res.data || res);
        this.router.navigate(['/home']).then();
      }
    })
    }
  }

}
