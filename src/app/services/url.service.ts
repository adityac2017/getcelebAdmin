import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
baseUrl = 'https://getceleb.in/server/api/admin';
imageUrl = `https://getceleb.in/server/api/user/image/`;
// baseUrl = 'http://13.234.186.152:3000/api/admin';
// imageUrl = `http://13.234.186.152/uploads/`;
constructor() { }

login = `${this.baseUrl}/signIn`;
allClient = `${this.baseUrl}/allClient`;
addClient = `${this.baseUrl}/addClient`;
editClient = `${this.baseUrl}/editClient`;
allUsers = `${this.baseUrl}/allUsers`;
allBookings = `${this.baseUrl}/allBookings`;
payToClient = `${this.baseUrl}/payToClient`;
clientVedios = `${this.baseUrl}/clientVedios`;
deleteVideos = `${this.baseUrl}/deleteVideos`;
blockClient = `${this.baseUrl}/blockClient`;
blockUser = `${this.baseUrl}/blockUser`;
uploadClientVideo = `${this.baseUrl}/uploadClientVideo`;
addCategory = `${this.baseUrl}/addCategory`;
editCategory = `${this.baseUrl}/editCategory`;
allCategories = `${this.baseUrl}/allCategories`;
getAllCategories = `${this.baseUrl}/getAllCategories`;

}