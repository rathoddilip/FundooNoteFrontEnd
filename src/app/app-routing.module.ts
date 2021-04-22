import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authGuard/login.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  { 
    path : 'login', component: LoginComponent
  },
  {
    path:'forgotpassword' , component:ForgotpasswordComponent
  },
  
  { 
    path : 'resetpassword/:token', component: ResetpasswordComponent
  },
  {
    path: '', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path:'dashboard', component:DashboardComponent , canActivate:[LoginGuard]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
  
}
