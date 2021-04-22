import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private httpService : HttpService) 
  { 

  }

  registerUser(data:any)
   {
    console.log("  register data in user services ", data);
    return this.httpService.post('Users/Register', data,null);
  }
  login(data: any)
  {
    console.log(" login data in user services ", data);
    return this.httpService.post('Users/Login', data,null);
  }

  resetPassword(data:any)
   {
    console.log(" reset user services ", data );
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    let options = { headers: headers };
    return this.httpService.post('Users/Resetpassword', data,options);
  }

  ForgetPassword(data: any)
  {
    console.log(" reset user services ", data );
    return this.httpService.post('Users/ForgetPassword', data,null);
  }
  
  logindashboard()
  {
    return !!localStorage.getItem("FunDooNotesJWT");
  }
}
