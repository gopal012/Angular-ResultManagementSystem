import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-teacher-signup-page',
  templateUrl: './teacher-signup-page.component.html',
  styleUrls: ['./teacher-signup-page.component.css']
})
export class TeacherSignupPageComponent implements OnInit{
  public signUpForm !:FormGroup
  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private router:Router,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,,Validators.minLength(6)]]
    })
  }

  //WHEN TEACHER TRY TO SIGNUP THEN THIS FUNCTION IS BEING CALLED
  signUp(){
    this.http.post<any>("http://localhost:3000/SignUpTeachers",this.signUpForm.value)
    .subscribe(res=>{
      this.toast.success({detail:"Success", summary:"SignUp Completed",duration:5000});
      this.signUpForm.reset();
      this.router.navigate(['teacher-login']);
    },
    err=>{
      this.toast.error({detail:"Error", summary:"Try Again Later !!",duration:5000});
    })
  }
}
