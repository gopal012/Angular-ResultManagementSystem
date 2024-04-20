import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student-login-page',
  templateUrl: './student-login-page.component.html',
  styleUrls: ['./student-login-page.component.css']
})
export class StudentLoginPageComponent implements OnInit{ 
  public loginForm !:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private router:Router,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      rollNo:['',],
      dateOfBirth:['']
    })
  }

  //THIS FUNCTION IS CALLED WHEN STUDENT TRY TO LOGIN IN TO VIEW THEIR RESULT
  onLogin(){
    this.http.get<any>("http://localhost:3000/studentRecords").subscribe(res=>{
      const student = res.find((a:any)=>{
        return a.rollNo == this.loginForm.value.rollNo && a.dateOfBirth == this.loginForm.value.dateOfBirth;
      });

      if(student){
        this.router.navigate(['student'],{queryParams:{data:student.rollNo,dob:student.dateOfBirth}});
      }else{
        this.toast.error({detail:"User Doesn't Exists",summary:"Try Again",duration:5000});
        this.loginForm.reset();
      }
    },
    err=>{
      this.toast.error({detail:"Something Went Wrong",summary:"Try Again",duration:5000});
    })
  }

}
