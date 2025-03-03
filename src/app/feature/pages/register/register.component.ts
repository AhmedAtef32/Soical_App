import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  isCallApi:boolean = false;
  registerForm:FormGroup = this._formBuilder.group({
    name : [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email : [null, [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$$/)]],
    rePassword : [null , [Validators.required]],
    dateOfBirth : [null, [Validators.required]],
    gender : [null , Validators.required ],
  } , {validators : [this.matchPassword]});




  matchPassword(group:AbstractControl){

    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password == rePassword ? null : {notMatch : true}
  }


  submitRegisterForm(){
    this.isCallApi = true;
    if(this.registerForm.valid){
      this.authService.signUp(this.registerForm.value).subscribe({
        next : (res) => {
          console.log(res);
          if (res.message == "success") {
            this.toastrService.success("Register Success");
            setTimeout(() => {
              this.router.navigate(['/login'])

            }, 1000);
          }
          this.isCallApi = false;
        },error : (err) => {
          console.log(err);
          this.isCallApi = false;
        }
      })
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
