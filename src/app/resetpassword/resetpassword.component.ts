import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { UserService } from '../services/UserServices/user.service';
import { Router, RouterStateSnapshot, ActivatedRoute, Params  } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher 
{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !! (control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
} 
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  
  matcher = new MyErrorStateMatcher();
  public isActive: boolean;
  public token: string;
  resetPassword:FormGroup;

  public EmailTld: string = '@gmail.com';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;

  constructor(private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute,private userService : UserService,public snackBar: MatSnackBar) 
    { 
      this.resetPassword = this.formBuilder.group(
        {
          password:  new FormControl('', [Validators.required, 
          Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
          ]),
          confirmPassword:  new FormControl('', [Validators.required, 
          ])
        },
      { 
        validators: this.checkPasswords 
      },
    );   
    this.isActive = true;
    this.token = '';
  } 
  openSnackBar(message: string, duration: number) 
  {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  checkPasswords(group: FormGroup) 
  {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }
  TogglePassword()
  {
    this.isActive = this.isActive ? false : true 
  }
  ngOnInit(): void 
  {
      this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
      localStorage.setItem('FunDooNotesJWT', this.token);
    });
  }
  
  ResetPassword()
  {
    if(this.resetPassword.valid)
    {
      this.openSnackBar('Resetting password...', 0);
      let reqData =
      {
        newPassword: this.resetPassword.get('password')?.value,
        confirmPassword:this.resetPassword.get('confirmPassword')?.value
      }
    
      this.userService.resetPassword(reqData).subscribe
      (
       response => 
        {
          console.log("register successfull", response);
          this.openSnackBar('Password reset successful', 2000); 
        },
        error => {
        try 
        {
          if(error['status'] == 0)
          {
            this.openSnackBar('Password reset failed: server offline', 2000,);
          }
          else
          {
            this.openSnackBar('Password reset failed: '+error['error']['message'], 2000);
          }
        } 
        catch (error) {
          this.openSnackBar('Password reset link is invalid',0);
        }
      });
    } 
  }
}