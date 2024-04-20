import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit{
  
  // student !:any
  rollNo:number=0;
  name:string='';
  dateOfBirth:string='';
  score:number=0;
  
  constructor(private route: ActivatedRoute,private http:HttpClient){
  }
  
  ngOnInit(): void {
      this.route.queryParams.subscribe((params:any)=>{
        this.rollNo = params.data;
        this.dateOfBirth = params.dob;
      })
      this.http.get<any>("http://localhost:3000/studentRecords").subscribe(res=>{
      const student = res.find((a:any)=>{
        return a.rollNo == this.rollNo  && a.dateOfBirth == this.dateOfBirth;
      });
      this.rollNo= student.rollNo;
      this.name= student.name;
      this.dateOfBirth = student.dateOfBirth;
      this.score = student.score;
    })
  }
}


  
