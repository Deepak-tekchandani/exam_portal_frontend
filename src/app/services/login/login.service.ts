import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current user : which is loggedin
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user : set token in local Storage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }
  
  //isLogin : user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr =='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //logout : Remove token from local Storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  } 

  //get Token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetalis
  public setUser(user:any){
    localStorage.setItem('user' , JSON.stringify(user));

  }

  //get User
  public getuser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user Role
  public getUserRole(){

    let user = this.getuser()
    return user.authorities[0].authority;

    

  }
}
