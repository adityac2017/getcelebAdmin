import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {addBody} from 'src/app/requests/client/add';
import {updateBody} from 'src/app/requests/client/update';
import { AppComponent } from 'src/app/app.component';
import {ToastrService} from 'ngx-toastr';
import {updateUserBody} from 'src/app/requests/users/updateUsers';
import {blockUnblock} from 'src/app/requests/users/blockUnblock';
import {UrlService} from '../../services/url.service';
  import * as js from '../../../assets/js/app';
declare var $: any;
import {PaginationBody} from 'src/app/requests/pagination';
import {LocalStorage} from '@ngx-pwa/local-storage';
//  import * as _ from 'lodash'; 
// import * as moment from 'moment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
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
  file1: File;
  src1: any;
  profileImage: string;
  introVedio: string;
  introVedioUpdate: string;
  flags = {
    isSubmitted: false
  };
  checkemail:boolean;
  tagsEnterData1 : any[]=[];
  enterTag:string;
  getListCategory: any[]=[];
  viewBody = {name: '',gender: '',age: '',phoneNumber: '',postalCode: '',dob: '',height: '',scoreCredits:''}
  message = '';
  @ViewChild('dateNGO') dateNGO: ElementRef;
  @ViewChild('dateNGOAdd') dateNGOAdd: ElementRef;
  
  constructor(
    protected api: ApiService,
    private spinner: AppComponent,
    private toaster: ToastrService,
    private localStorage: LocalStorage,
    private url: UrlService) { }
  deleteBody = {_id: '', isDeleted: '0', index: 0};

  ngOnInit() {
    js.emailConfirm();
    js.enterNumber();
    this.imageUrl = this.url.imageUrl;
    this.localStorage.getItem('user').subscribe((user) => {
      this.token = user.token;  
      this.getData(this.token);
      this.getCategory(this.token)
    });
    this.serialNumber = 0;
    this.getUserBody.limit = 10;
    this.getUserBody.skip = 0;
    // js.onlyDigitNum();
  //  js.datetimepicker();
   js.timer();
  }

  getData(token:any){
    this.spinner.showSpinner();
    this.api.allClient(this.getUserBody,token).subscribe((response: any) => {
     console.log('allClient',response);
     this.spinner.hideSpinner();
      if(response.success == true){
         this.getList = response.clients;
         this.totalCount = response.total;   
      }
       });
  }
  getCategory(token){
    this.spinner.showSpinner();
    this.api.allCagetAllCategoriestegories(token).subscribe((response: any) => {
     console.log('allClient',response);
     this.spinner.hideSpinner();
      if(!response.success) return this.warning(response.message)
         this.getListCategory = response.data;
       });
  }
  

  search() {
    
    console.log(this.getUserBody.searchText);
  //  if(this.getUserBody.searchText.length > 3){
    this.getData(this.token);
  //  }
    
  }

  blockUnblocks(val:any,index:number,status:number){
 
    console.log(index)
    this.blockUnblock.isBlocked = status;
    this.blockUnblock.clientId = val;
    this.spinner.showSpinner();
      this.api.blockClient(this.blockUnblock,this.token).subscribe((response: any) => {
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


  viewDetail(val:any){
    // console.log('val',val)

    this.viewBody.name = val.name;
    this.viewBody.gender = val.gender;
    this.viewBody.age = val.age;
    this.viewBody.phoneNumber = val.phoneNumber;
    this.viewBody.postalCode = val.postalCode;
    this.viewBody.dob = val.dob;
    this.viewBody.height = val.height;
    this.viewBody.scoreCredits = val.scoreCredits;
  }


  selectFile (e: any) {
    const file = e.target.files[0];
    // console.log(file);
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      //this.fileName = file.name;
      this.file = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
         this.src = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      
      alert('Selected file is not image.');
    }
  }

  selectFileNgo(e: any) {
    const file = e.target.files[0];
    // console.log(file);
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      this.file1 = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
         this.src1 = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      alert('Selected file is not image.');
    }
  }

  selectVideo (e: any) {
    const fileVideo = e.target.files[0];
    // console.log(fileVideo);
      this.fileVideo = fileVideo;
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //    this.src = e.target.result;
      // }
      // reader.readAsDataURL(e.target.files[0]);
   
  }

  addData () {
    this.flags.isSubmitted = true;

    this.checkemail = this.confirmEmail(this.addBody.clientEmail);
    if(this.checkemail == false){
      this.warning('Enter Correct Email')
      this.flags.isSubmitted = false;
    } else if (!this.addBody.clientPassword){
      this.warning('Enter Client Password')
      this.flags.isSubmitted = false;
     } else if (!this.addBody.clientName){
      this.warning('Enter Client Name')
      this.flags.isSubmitted = false;
     } else if (!this.addBody.clientPhone){
      this.warning('Enter Client Phone Number')
      this.flags.isSubmitted = false;
     }else if (!this.addBody.campaignType){
      this.warning('Select User Type')
      this.flags.isSubmitted = false;
     }else if (!this.addBody.categoryId){
      this.warning('Select Category')
      this.flags.isSubmitted = false;
     }
       else if (!this.addBody.instagramId){
      this.warning('Enter Instagram Id')
      this.flags.isSubmitted = false;
     }  else if (!this.addBody.vedioPrice) {
      this.warning('Enter Vedio Price')
      this.flags.isSubmitted = false;
    } else if (!this.addBody.description){
      this.warning('Enter Description')
      this.flags.isSubmitted = false;
     } 
      else if (!this.addBody.title){
      this.warning('Enter Title')
      this.flags.isSubmitted = false;
     } else if (this.tagsEnterData1.length == 0){
      this.warning('Enter Atleast One Tag')
      this.flags.isSubmitted = false;
     }
     else if (!this.addBody.campaignDesc && this.addBody.campaignType == 1){
      this.warning('Enter NGO  Description')
      this.flags.isSubmitted = false;
     } 
     else if (!this.dateNGOAdd.nativeElement.value  && this.addBody.campaignType == 1){
      this.warning('Enter NGO Time')
      this.flags.isSubmitted = false;
     } 
     else if (!this.file1  && this.addBody.campaignType == 1){
      this.warning('Select NGO Image')
      this.flags.isSubmitted = false;
     }
    else{
      if (this.addBody.campaignType == 1){
      const dateData = this.dateNGOAdd.nativeElement.value;
      this.addBody.campaignTime = dateData
      }
      this.addBody.tag = this.tagsEnterData1;
      this.spinner.showSpinner();
      const formData = new FormData();
      if (this.file) {
        formData.append('profileImage', this.file);
      }
      if (this.file1) {
        formData.append('campaignImage', this.file1);
      }
      if (this.fileVideo) {
        formData.append('introVedio', this.fileVideo);
      }
      formData.append('clientEmail', this.addBody.clientEmail);
      formData.append('clientName', this.addBody.clientName);
      formData.append('clientPassword', this.addBody.clientPassword);
      formData.append('clientPhone', this.addBody.clientPhone);
      formData.append('categoryId', this.addBody.categoryId);
      formData.append('description', this.addBody.description);
      formData.append('campaignType', this.addBody.campaignType.toString());
      formData.append('instagramId', this.addBody.instagramId);
      formData.append('campaignDesc', this.addBody.campaignDesc);
      formData.append('campaignTime', this.addBody.campaignTime);
      formData.append('tag', JSON.stringify(this.addBody.tag));
      formData.append('title', this.addBody.title);
      formData.append('vedioPrice', this.addBody.vedioPrice);
      this.api.addClient(formData, this.token).subscribe((response: any) => {
        console.log('addClient', response);
        this.spinner.hideSpinner();
        if (response.success == 200) {
          this.getList.push(response.client);
          this.profileImage = response.client.profileImage;
          this.success(response.message);
          $('#close-add-modal').trigger('click');
          this.addBody = new addBody;
          this.flags.isSubmitted = false;
        }
        else {
          $('#close-add-modal').trigger('click');
          this.flags.isSubmitted = false;
          this.error(response.message);
        }
      });
  }
}

confirmEmail(email){
  // var userinput = email;
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
  if(!pattern.test(email))
  {
  //  this.warning('Enter Correct Email');
  return false;
  }​
  else{
    // this.warning('Successs');
    return true;
  }
}

editData (val:any , index:Number) {
   console.log(val)
   this.updateBody.clientId = val._id;
  this.updateBody.clientEmail = val.clientEmail;
  this.updateBody.clientName = val.clientName;
  this.updateBody.clientPhone = val.clientPhone;
  this.updateBody.instagramId = val.instagramId;
  this.updateBody.vedioPrice = val.vedioPrice;
  this.updateBody.description = val.description;
  this.updateBody.campaignType = val.campaignType;
  this.updateBody.title = val.title;
  this.updateBody.campaignImage = val.campaignImage;
  this.updateBody.campaignDesc = val.campaignDesc;
  this.updateBody.campaignTime = val.campaignTime;
  this.updateBody.categoryId = val.categoryId?val.categoryId._id:'';
  if(this.updateBody.campaignType == 1){
    $('.dateNGOUpdate').css('display','block')
  }else{
    $('.dateNGOUpdate').css('display','none')
  }
  this.tagsEnterData1 = val.tag;
  this.profileImage = val.profileImage;
  this.introVedioUpdate = val.introVedio;
  this.updateBody.clientPassword = val.clientPassword
  this.updateBody.index = index;
  // $('#update-modal').modal('show');
}


updateData () {


  this.flags.isSubmitted = true;

  this.checkemail = this.confirmEmail(this.updateBody.clientEmail);
  if(this.checkemail == false){
    this.warning('Enter Correct Email')
    this.flags.isSubmitted = false;
  }  else if (!this.updateBody.clientName){
    this.warning('Enter Client Name')
    this.flags.isSubmitted = false;
   } else if (!this.updateBody.clientPhone){
    this.warning('Enter Client Phone Number')
    this.flags.isSubmitted = false;
   }  else if (!this.updateBody.instagramId){
    this.warning('Enter Instagram Id')
    this.flags.isSubmitted = false;
   }  else if (!this.updateBody.vedioPrice) {
    this.warning('Enter Vedio Price')
    this.flags.isSubmitted = false;
  } else if (!this.updateBody.description){
    this.warning('Enter Description')
    this.flags.isSubmitted = false;
   } 
    else if (!this.updateBody.title){
    this.warning('Enter Title')
    this.flags.isSubmitted = false;
   } else if (this.tagsEnterData1.length == 0){
    this.warning('Enter Atleast One Tag')
    this.flags.isSubmitted = false;
   }
   else if (!this.updateBody.campaignDesc  && this.updateBody.campaignType == 1){
    this.warning('Enter NGO  Description')
    this.flags.isSubmitted = false;
   } 
   else if (!this.dateNGO.nativeElement.value && this.updateBody.campaignType == 1){
    this.warning('Enter NGO Time')
    this.flags.isSubmitted = false;
   } 
   
  else{
    if (this.updateBody.campaignType == 1){
    const dateData = this.dateNGO.nativeElement.value;
    this.updateBody.campaignTime = dateData
    }

    this.updateBody.tag = this.tagsEnterData1;
    this.spinner.showSpinner();
    const formData = new FormData();
    if (this.file) {
      formData.append('profileImage', this.file);
    }
    if (this.file1) {
      formData.append('campaignImage', this.file1);
    }
    if (this.fileVideo) {
      formData.append('introVedio', this.fileVideo);
    }
    else {
      formData.append('introVedio', this.introVedioUpdate);
    }
    formData.append('clientId', this.updateBody.clientId);
    formData.append('clientEmail', this.updateBody.clientEmail);
    formData.append('clientName', this.updateBody.clientName);
    formData.append('clientPhone', this.updateBody.clientPhone);
    formData.append('categoryId', this.updateBody.categoryId);
    formData.append('description', this.updateBody.description);
    formData.append('campaignType', this.updateBody.campaignType.toString());
    formData.append('campaignDesc', this.updateBody.campaignDesc);
    formData.append('campaignTime', this.updateBody.campaignTime);
    formData.append('instagramId', this.updateBody.instagramId);
    // formData.append('clientPassword', this.updateBody.clientPassword);
    formData.append('tag', JSON.stringify(this.updateBody.tag));
    formData.append('title', this.updateBody.title);
    formData.append('vedioPrice', this.updateBody.vedioPrice);
  // for (var x in this.addBody) {
    // formData.append(x, this.addBody[x]);  
// }
  this.api.editClient(formData,this.token).subscribe((response: any) => {
    // console.log(response);
    if (response.success == 200){
      // this.getList.push(response.client);
      this.getList[this.updateBody.index] = response.client;
      this.spinner.hideSpinner();
    this.success(response.message);
       $('#close-update-modal').trigger('click');
       this.updateBody = new updateBody;
       this.src = '';
       this.flags.isSubmitted = false;
    }
  else{
    $('#close-update-modal').trigger('click');
    this.flags.isSubmitted = false;
  return this.error(response.message);
  
  }
  }, error => {
  alert(error.message);
  });
}
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


  enterData(){
    if(!this.enterTag){
      this.warning('Enter Tag Value');
    }
    else{
      this.tagsEnterData1.push(this.enterTag);
      this.enterTag='';
    }
  }
  removeData(i){
    console.log(i)
    this.tagsEnterData1.splice(i, 1);
  }

  campaignTypeAdd(val){
    this.addBody.campaignType = val;
    if(val == 1){
      $('.dateNGOAdd').css('display','block')
    }else{
      $('.dateNGOAdd').css('display','none')
    }
  }
  campaignTypeUpdate(val){
    this.updateBody.campaignType = val;
    if(val == 1){
      $('.dateNGOUpdate').css('display','block')
    }else{
      $('.dateNGOUpdate').css('display','none')
    }
    
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

warning = (message: string) => {
  this.toaster.warning(message, 'Warning');
}

success = (message: string) => {
  this.toaster.success(message, 'Success');
}


}

