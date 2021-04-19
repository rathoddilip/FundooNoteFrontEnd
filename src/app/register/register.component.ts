import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


 
  public isActive: boolean;
  public notSame: boolean;
  registerForm:FormGroup;
  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  
  addExtraClass: boolean = false;
  constructor(private formBuilder:FormBuilder) { 
    
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
  

  ngOnInit(): void {
    
  }
  register(){
    
    
  } 

  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  
 checkPasswords(group: FormGroup) {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}

}


