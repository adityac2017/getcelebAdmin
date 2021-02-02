import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { BodyComponent } from './body/body.component';
import { ClientComponent } from './views/client/client.component';
import { UsersComponent } from './views/users/users.component';
import { BookingsComponent } from './views/bookings/bookings.component';
import { ClientVideosComponent } from './views/client-videos/client-videos.component';
import { CategoryComponent } from './views/category/category.component';






const routes: Route[] = [
  {path: '', component: LoginPageComponent},
  { path: '', canActivate: [AuthGuard], component: BodyComponent, children: [
    
     {path:'allClient', component:ClientComponent},
     {path:'users', component:UsersComponent},
     {path:'booking', component:BookingsComponent},
     {path:'category', component:CategoryComponent},
     {path:'clientVedios/:userId', component:ClientVideosComponent},

  ]},
  { path: '**', component: NotFoundComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
