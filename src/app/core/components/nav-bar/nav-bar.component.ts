import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IuserData } from '../../../shared/interfaces/iuser-data';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink , RouterLinkActive] ,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)

@Input({required:true}) islogged!:boolean;
 userData!:IuserData
ngOnInit(): void {

  if (isPlatformBrowser(this.pLATFORM_ID)) {
    if(localStorage.getItem("userToken")){
      this.getUserData();
    }
  }


}


getUserData(){
  this.authService.getUserData().subscribe({
    next: (res)=>{
      this.userData = res.user
    }
  });
}
 signOut(){
  this.authService.signOut();

}
}
