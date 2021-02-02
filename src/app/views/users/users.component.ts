import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {addBody} from 'src/app/requests/client/add';
import {updateBody} from 'src/app/requests/client/update';
import { AppComponent } from 'src/app/app.component';
import {ToastrService} from 'ngx-toastr';
import {updateUserBody} from 'src/app/requests/users/updateUsers';
import {blockUnblock} from 'src/app/requests/users/blockUnblock';
import {UrlService} from '../../services/url.service';
//import {Resp} from 'src/app/requests/resp';
  declare var $: any;
 import {PaginationBody} from 'src/app/requests/pagination';
 import {LocalStorage} from '@ngx-pwa/local-storage';
//  import * as _ from 'lodash'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentPage = 1;
  serialNumber: number;
  showBoundaryLinks = true;
  maxSize = 5;
  totalCount: number;
  getUserBody = new PaginationBody;
  getList : any[] =[];
  updateUserBody = new updateUserBody;
  addBody = new addBody;
  updateBody = new updateBody;
  blockUnblock = new blockUnblock;
  token: string;
  imageUrl:string;
  file: File;
  fileVideo: File;
  src: any;
  profileImage: string;
  viewBody = {name: '',gender: '',age: '',phoneNumber: '',postalCode: '',dob: '',height: '',scoreCredits:''}
  message = '';
  constructor(
    protected api: ApiService,
    private spinner: AppComponent,
    private toaster: ToastrService,
    private localStorage: LocalStorage,
    private url: UrlService) { }
  deleteBody = {_id: '', isDeleted: '0', index: 0};

  ngOnInit() {
    this.imageUrl = this.url.imageUrl;
    this.localStorage.getItem('user').subscribe((user) => {
      this.token = user.token;  
      this.getData(this.token);
    });
    this.serialNumber = 0;
    this.getUserBody.limit = 10;
    this.getUserBody.skip = 0;
  }

  getData(token:any){
   this.spinner.showSpinner();
    this.api.allUsers(this.getUserBody,token).subscribe((response: any) => {
     console.log(response);
     this.spinner.hideSpinner();
      if(response.success == true){
         this.getList = response.user;
         this.totalCount = response.total;   
      }
       });
  }
  
  search() {
    // if(this.getUserBody.searchText.length > 3){
    this.getData(this.token);
    // }
  }


  blockUnblocks(val:any,index:number,status:number){

    // console.log(index)
    this.blockUnblock.isBlocked = status;
    this.blockUnblock.userId = val;
    this.spinner.showSpinner();
      this.api.blockUser(this.blockUnblock,this.token).subscribe((response: any) => {
        console.log(response);
        this.spinner.hideSpinner();
      if (response.success == true){
        this.spinner.hideSpinner();
      this.getList[index].isBlocked = response.result.isBlocked;
      } 
      else{
        return this.error(response.message);
      }
    }, error => {
      alert(error.message);
      });
  }

pageChanged (e:any): void {
  this.getUserBody.skip = e.page - 1;
  this.serialNumber = this.getUserBody.limit * this.getUserBody.skip;
  // console.log(this.getUserBody.skip);
   this.getData(this.token);
}


selectImage(image:any,status:any){
if(status == 1){
  this.profileImage = image;
}
else{
  this.profileImage = this.imageUrl+''+image;
}
$('#imageModel').modal('show');
}

error = (message: string) => {
  this.toaster.error(message, 'Error');
}

// success = (message: string) => {
//   this.toaster.success(message, 'Success');
// }


}


