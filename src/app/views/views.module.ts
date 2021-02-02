import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule,  } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../main-layout/footer/footer.component';
import { PaginationModule } from 'ngx-bootstrap';
import { ClientComponent } from './client/client.component';
import { UsersComponent } from './users/users.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ClientVideosComponent } from './client-videos/client-videos.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    FooterComponent,
   
    ClientComponent,
   
    UsersComponent,
   
    BookingsComponent,
   
    ClientVideosComponent,
   
    CategoryComponent
  

  ],
  exports: [
    FooterComponent,
  
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
