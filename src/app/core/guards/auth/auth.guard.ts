import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

 const _pLATFORM_ID = inject(PLATFORM_ID);
 const _router = inject(Router);

 if (isPlatformBrowser(_pLATFORM_ID)) {
  if (localStorage.getItem("userToken") !==null) {
    _router.navigate(['/home']);
    return false;
  }else{

    return true;
  }
 }else{
 return false;
 }


};
