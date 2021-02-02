import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {LoginBody} from '../requests/login-body';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginBody = new LoginBody;
  flags = {
    isSubmitted: false
  };
  constructor(
    private api: ApiService,
    private localStorage: LocalStorage,
    private toaster: ToastrService,
     private router: Router
  ) { }

  ngOnInit() {
  }
  login() {
    this.flags.isSubmitted = true;
    this.api.login(this.loginBody).subscribe((response: any) => {
      this.flags.isSubmitted = false;
      if (response.success == 400) return this.error(response.message);
      console.log('login',response)
      this.localStorage.setItem('user', response.data).subscribe(() => {});
     this.router.navigateByUrl('/allClient');
    }, error => {
      this.flags.isSubmitted = false;
      alert(error.message);
    });
  }
  error = (message: string) => {
    this.toaster.error(message, 'Error');
  }

}
