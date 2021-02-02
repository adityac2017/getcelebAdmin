import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {LocalStorage} from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;

  constructor(
    private router : Router,
    private localStorage: LocalStorage,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logout () {

 
  
      // this.localStorage.removeItemSubscribe('user');
      // this.localStorage.clearSubscribe();
      //localStorage.clear();
      this.localStorage.removeItem('user').subscribe(() => {});
        this.router.navigateByUrl('/')
        
 
  }

}
