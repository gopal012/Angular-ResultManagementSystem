import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-teacher-login-page',
  templateUrl: './teacher-login-page.component.html',
  styleUrls: ['./teacher-login-page.component.css']
})
export class TeacherLoginPageComponent implements OnInit{
  public loginForm !:FormGroup

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private router:Router,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  //WHEN TEACHER TRY TO LOGIN THEN THIS FUNCTION IS BEING CALLED
  onLogin(){
    this.http.get<any>("http://localhost:3000/SignUpTeachers").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email=== this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        this.toast.success({detail:"Welcome " +user.fullName,summary:"Login Success",duration:5000});
        this.loginForm.reset();
        this.router.navigate(['teacher']);
      }else{
        this.toast.error({detail:"Invalid Credentials",summary:"Try Again !!",duration:5000});
        this.loginForm.reset();
      }
    },
    err=>{
      this.toast.error({detail:"omething Went Wrong",summary:"Try Again !!",duration:5000});
    })
  }

}
