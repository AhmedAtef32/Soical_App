import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroments } from '../../../core/enviroments/enviroments';
import { IuserData } from '../../interfaces/iuser-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  private readonly _router= inject(Router)

  userData!: IuserData | null
  signUp(data:object):Observable<any>{
    return this.httpClient.post(`${Enviroments.baseUrl}/users/signup`,data)
  }

  signIn(data:object):Observable<any>{
    return this.httpClient.post(`${Enviroments.baseUrl}/users/signin`,data)
  }

  getUserData():Observable<any>{
    return this.httpClient.get(`${Enviroments.baseUrl}/users/profile-data`)
  }
  signOut(){
    localStorage.removeItem("userToken");
    this.userData = null
    this._router.navigate(['/login']);
  }
}
