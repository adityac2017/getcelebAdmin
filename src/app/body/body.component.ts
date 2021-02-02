import { Component, OnInit } from '@angular/core';
import * as js from '../../assets/js/app';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    js.sideNav();
  }

}
