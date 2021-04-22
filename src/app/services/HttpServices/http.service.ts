import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) 
  { 
    
  }

  // post(url:any, data:any)
  // {
  //   console.log("http called");
  //   return this.http.post(this.baseUrl  + url,data,);
  // }
  post(url: any, data : any, headers: any)
  {
    console.log("http called");
    if(headers != null)
    {
      return this.http.post(this.baseUrl + url, data, headers);
    }
    return this.http.post(this.baseUrl + url, data);
  }
}
