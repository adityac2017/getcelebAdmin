import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';
import { HttpClientModule} from '@angular/common/http';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './views/errors/error.module';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { BodyComponent } from './body/body.component';
import {ToastrModule} from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    BodyComponent,
    SidebarComponent,
  
    
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    FormsModule,
    SharedModule,
    ViewsModule,
    ErrorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
