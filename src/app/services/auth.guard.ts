import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


 import {LocalStorage} from '@ngx-pwa/local-storage';
  import {admin} from 'src/app/requests/admin/admin';;


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {




  user = new admin;
  constructor (private localStorage: LocalStorage,) {} 
  
  
  canActivate(): boolean {
    this.getUser().then(user => {
      if (!user) {
        alert('Your session is expire, please sign in.');
        window.location.href = '/';
      }
      return true;
    });
    return true;
  }
  getUser () {
    return new Promise((done, reject) => {
      console.log(reject);
      this.localStorage.getItem('user').subscribe((user: any) => {
        done(user);
      });
    })
  }
}
