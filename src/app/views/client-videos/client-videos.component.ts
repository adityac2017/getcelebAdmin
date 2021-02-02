import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppComponent } from 'src/app/app.component';
import {ToastrService} from 'ngx-toastr';
import {UrlService} from '../../services/url.service';
import * as js from '../../../assets/js/app';
import {PaginationBody} from 'src/app/requests/pagination';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-client-videos',
  templateUrl: './client-videos.component.html',
  styleUrls: ['./client-videos.component.scss']
})
export class ClientVideosComponent implements OnInit {
  index:number;
  currentPage = 1;
  serialNumber: number;
  showBoundaryLinks = true;
  maxSize = 5;
  totalCount: number;
  getUserBody = new PaginationBody;
  getList : any[] =[];
  token: string;
  imageUrl:string;
  message = '';
  userId:string;
  
  constructor(
    protected api: ApiService,
    private spinner: AppComponent,
    private toaster: ToastrService,
    private localStorage: LocalStorage,
    private url: UrlService,
    private activatedRoute: ActivatedRoute,) { }
 

  ngOnInit() {
   

    js.emailConfirm();
    this.imageUrl = this.url.imageUrl;
    this.localStorage.getItem('user').subscribe((user) => {
      this.token = user.token;  
      this.getData(this.token);
    });
    this.serialNumber = 0;
    this.getUserBody.limit = 10;
    this.getUserBody.skip = 0;
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.userId;
    });
  }

  getData(token:any){
    
    this.spinner.showSpinner();
    this.getUserBody.clientId = this.userId;
    this.api.clientVedios(this.getUserBody,token).subscribe((response: any) => {
      console.log(response);
     this.spinner.hideSpinner();
      if(response.success == true){
         this.getList = response.result;
         this.totalCount = response.total;   
      }
       });
  }

  deleteVideo(val:any,index:number){
this.index = index;
    this.spinner.showSpinner();
    this.getUserBody.requestId = val;
    this.api.deleteVideos(this.getUserBody,this.token).subscribe((response: any) => {
      console.log(response);
     this.spinner.hideSpinner();
      if(response.success == true){
        this.getList.splice(this.index, 1);
        return this.success(response.message)
        //  this.getList = response.result;
        //  this.totalCount = response.total;   
      }
       });

  }

pageChanged (e:any): void {
  this.getUserBody.skip = e.page - 1;
  this.serialNumber = this.getUserBody.limit * this.getUserBody.skip;
  // console.log(this.getUserBody.skip);
   this.getData(this.token);
}

error = (message: string) => {
  this.toaster.error(message, 'Error');
}

success = (message: string) => {
  this.toaster.success(message, 'Success');
}


}

