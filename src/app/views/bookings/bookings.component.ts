import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppComponent } from 'src/app/app.component';
import {ToastrService} from 'ngx-toastr';
import {blockUnblock} from 'src/app/requests/users/blockUnblock';
import {UrlService} from '../../services/url.service';
  import * as js from '../../../assets/js/app';
declare var $: any;
import {PaginationBody} from 'src/app/requests/pagination';
import {LocalStorage} from '@ngx-pwa/local-storage';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  currentPage = 1;
  serialNumber: number;
  showBoundaryLinks = true;
  maxSize = 5;
  totalCount: number;
  getUserBody = new PaginationBody;
  getList : any[] =[];
  blockUnblock = new blockUnblock;
  token: string;
  imageUrl:string;
  file: File;
  fileVideo: File;
  src: any;
  profileImage: string;
  introVedio: string;
  introVedioUpdate: string;
  bookingId:string;
  bookingIndex: number;
  bookingStatus: number;
  flags = {
    isSubmitted: false
  };
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
    js.emailConfirm();
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
    this.api.allBookings(this.getUserBody,token).subscribe((response: any) => {
    //  console.log(response);
     this.spinner.hideSpinner();
      if(response.success == 200){
         this.getList = response.result;
        //  this.getList = _.uniqBy(this.getList, function (e) { return e.paytmOrderId; });
         this.totalCount = response.total;   
      }
      else{
        return this.error(response.message);
      }
       });
  }
  payToClient(){ 

    this.spinner.showSpinner();
     this.api.payToClient({requestId:this.bookingId,amountPaidToClient:this.bookingStatus},this.token).subscribe((response: any) => {
        // console.log(response);
        this.spinner.hideSpinner();
        $('#closeConfirmModal').trigger('click');
     if (response.success == true){
      this.getList[this.bookingIndex].amountPaidToClient = response.result.amountPaidToClient;
      return this.success(response.message);
     } 
     else{
       return this.error(response.message);
     }
   }, error => {
     alert(error.message);
     });


 }

confirmPay(bookingId:any,bookingIndex:number,bookingStatus:number){
this.bookingId= bookingId;
this.bookingIndex= bookingIndex;
this.bookingStatus= bookingStatus;
// $('#confirmModal').modal('show');
}

uploadButton(bookingId:any,bookingIndex:number){
  this.bookingId= bookingId;
  this.bookingIndex= bookingIndex;
}

pageChanged (e:any): void {
  this.getUserBody.skip = e.page - 1;
  this.serialNumber = this.getUserBody.limit * this.getUserBody.skip;
  console.log(this.getUserBody.skip);
   this.getData(this.token);
}



selectVideo (e: any) {
  const fileVideo = e.target.files[0];
    this.fileVideo = fileVideo;
}


uploadVideo(){
  const formData = new FormData();
  if(!this.fileVideo) return this.error('Select Video')
  this.spinner.showSpinner();

  formData.append('vedio', this.fileVideo);
  formData.append('bookingId', this.bookingId);
  this.api.uploadClientVideo(formData,this.token).subscribe((response: any) => {
    console.log(response);
    if (response.success != true) return this.error(response.message)
      this.getList[this.bookingIndex] = response.result;
      this.spinner.hideSpinner();
      this.success(response.message);
      $('#closeConfirmModalVideo').trigger('click')
  });
}

error = (message: string) => {
  this.toaster.error(message, 'Error');
}

success = (message: string) => {
  this.toaster.success(message, 'Success');
}


}

