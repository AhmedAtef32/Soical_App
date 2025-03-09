import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


private readonly _formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  isCallApi:boolean = false;
  loginForm:FormGroup = this._formBuilder.group({
   email : [null, [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$$/)]],

  });




  submitloginForm(){
    this.isCallApi = true;
    if(this.loginForm.valid){
      this.authService.signIn(this.loginForm.value).subscribe({
        next : (res) => {
          console.log(res);
          if (res.message == "success") {

            this.toastrService.success("login Success");
            setTimeout(() => {
              localStorage.setItem("userToken", res.token)
              this.router.navigate(['/home'])

            }, 1000);
          }
          this.isCallApi = false;
        },error : (err) => {
          console.log(err);
          this.isCallApi = false;
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
      this.isCallApi = false;
    }
  }

}
