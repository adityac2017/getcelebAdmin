import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { PaginationBody } from 'src/app/requests/pagination';
import { LocalStorage } from '@ngx-pwa/local-storage';
//  import * as _ from 'lodash'; 
// import * as moment from 'moment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  currentPage = 1;
  serialNumber: number;
  showBoundaryLinks = true;
  maxSize = 5;
  totalCount: number;
  paginationBody = new PaginationBody;
  getList: any[] = [];
  token: string;
  flags = {
    isSubmitted: false
  };
  categoryName:string;
  categoryNameU:string;
  id:string;
  index:number;
  constructor(
    protected api: ApiService,
    private spinner: AppComponent,
    private toaster: ToastrService,
    private localStorage: LocalStorage) { }
  deleteBody = { _id: '', isDeleted: '0', index: 0 };

  ngOnInit() {
    this.localStorage.getItem('user').subscribe((user) => {
      this.token = user.token;
      this.getData(this.token);
    });
    this.serialNumber = 0;
    this.paginationBody.limit = 10;
    this.paginationBody.skip = 0;

  }

  getData(token: any) {
    this.spinner.showSpinner();
    this.api.allCategories(this.paginationBody, token).subscribe((response: any) => {
      console.log('allCategories', response);
      this.spinner.hideSpinner();
      if (response.success == true) {
        this.getList = response.result;
        this.totalCount = response.total;
      }
    });
  }

  addData() {
    this.flags.isSubmitted = true;
    if (!this.categoryName) {
      this.warning('Enter Category')
      this.flags.isSubmitted = false;
    }
    else {
      console.log(this.token)
      const data = {categoryName:this.categoryName};
      this.api.addCategory(data, this.token).subscribe((response: any) => {
        console.log('addClient', response);
        this.spinner.hideSpinner();
        if (!response.success)  return this.warning(response.message)
          this.getList.push(response.result);
          this.success(response.message);
          $('#close-add-modal').trigger('click');
          this.categoryName = '';
          this.flags.isSubmitted = false;
      });
    }
  }



  editData(val: any, index) {
    console.log(val)
    this.id = val._id;
    this.categoryNameU = val.categoryName;
    this.index = index;
    // $('#update-modal').modal('show');
  }


  updateData() {
    this.flags.isSubmitted = true;
    if (!this.categoryNameU) {
      this.warning('Enter Category')
      this.flags.isSubmitted = false;
    }
    else {
      this.api.editCategory({id:this.id,categoryName:this.categoryNameU}, this.token).subscribe((response: any) => {
        if (!response.success) return this.warning(response.message)
          this.getList[this.index] = response.result;
          this.spinner.hideSpinner();
          $('#close-update-modal').trigger('click');
          this.categoryNameU = '';
          this.flags.isSubmitted = false;
      });
    }
  }

  // removeData(i) {
  //   console.log(i)
  //   this.tagsEnterData1.splice(i, 1);
  // }



  pageChanged(e: any): void {
    this.paginationBody.skip = e.page - 1;
    this.serialNumber = this.paginationBody.limit * this.paginationBody.skip;
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

