import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  post(url:string, body:any, token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };
    return this.http.post(url, body, headers);
  }
  get(url:string,  token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };
    return this.http.get(url, headers);
  }
  multipart(url:string, body:any, token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };
    return this.http.post(url, body, headers);
  }

  constructor(private url: UrlService, private http: HttpClient) { }
  login(body: any) {
    return this.http.post(this.url.login, body);
  }
  allClient(body: any, token:any) {
    return  this.post(this.url.allClient, body,token);
  }
  addClient(body: any, token:any) {
    console.log('token',token)
    return  this.multipart(this.url.addClient, body,token);
  }
  editClient(body: any, token:any) {
    console.log('token',token)
    return  this.multipart(this.url.editClient, body,token);
  }
  allUsers(body: any, token:any) {
    return  this.post(this.url.allUsers, body,token);
  }
  allBookings(body: any, token:any) {
    return  this.post(this.url.allBookings, body,token);
  }
  payToClient(body: any, token:any) {
    return  this.post(this.url.payToClient, body,token);
  }
  

  clientVedios(body: any, token:any) {
    return  this.post(this.url.clientVedios, body,token);
  }


  deleteVideos(body: any, token:any) {
    return  this.post(this.url.deleteVideos, body,token);
  }
  blockClient(body: any, token:any) {
    return  this.post(this.url.blockClient, body,token);
  }

  blockUser(body: any, token:any) {
    return  this.post(this.url.blockUser, body,token);
  }

  uploadClientVideo(body: any, token:any) {
    console.log('token',token)
    return  this.multipart(this.url.uploadClientVideo, body,token);
  }
  
  addCategory(body: any, token:any) {
    return  this.post(this.url.addCategory, body,token);
  }
  editCategory(body: any,token:any) {
    return  this.post(this.url.editCategory, body,token);
  }
  allCategories(body: any,token:any) {
    return  this.post(this.url.allCategories, body,token);
  }
  
  
  allCagetAllCategoriestegories(token) {
    return  this.get(this.url.getAllCategories,token);
  }
  
  

  
  

}
