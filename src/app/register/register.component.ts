import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarConfig} from '@angular/material/snack-bar';
import {UserService} from '../services/UserServices/user.service'
export class MyErrorStateMatcher implements ErrorStateMatcher 
{
  isErrorState(control: FormControl | null,form: FormGroupDirective | NgForm | null): boolean 
  {
    const invalidCtrl = !! (control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.parent.hasError('notSame'));

    return (invalidCtrl || invalidParent);
  }
} 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  matcher = new MyErrorStateMatcher();
  public isActive: boolean;
  public notSame: boolean;
  registerForm:FormGroup;
  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
   autoHide: number = 10000;
  addExtraClass: boolean = false;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    public snackBar: MatSnackBar) 
    { 
    
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required,
           Validators.pattern('^[A-Z][a-z]{2,}$')
          ] ,), 
        lastName: new FormControl('', [Validators.required, 
          Validators.pattern('^[A-Z][a-z]{2,}$')
        ],),
        email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*$')
        ]),
        password:  new FormControl('', [Validators.required, 
          Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
        ]),
        confirmPassword:  new FormControl('', [Validators.required   
        
        ])
      },
      { validators: this.checkPasswords },
    );   
    this.isActive = true;
    this.notSame = false;
  } 
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  ngOnInit(): void 
  {
  } 
 
  register()
  {
    
    if(this.registerForm.valid)
    {
      this.openSnackBar('Registering user...', 0);
      let reqData =
      {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        username:"diliprathod32",
        password: this.registerForm.get('password')?.value,
        emailAddress: this.registerForm.get('email')?.value+this.EmailTld,
        phoneNumber:"7756994045"
        
      }
      
      this.userService.registerUser(reqData).subscribe(
        response => 
        {
          console.log("register successfull", response);
          this.openSnackBar('Registration successful', 2000);      
        },
        error => {
          if(error['status'] == 0)
          {
            this.openSnackBar('Registration failed: server offline', 2000,);
          }
          else
          {
            this.openSnackBar('Registration failed: '+error['error']['message'], 2000);
          }
        }
        );
    } 
  } 

  TogglePassword()
  {
    this.isActive = this.isActive ? false : true 
  }
  
 checkPasswords(group: FormGroup) 
 {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;
  return pass === confirmPass ? null : { notSame: true }
}

}


