import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { studentDataModel } from './add-record.model';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  formValue !:FormGroup
  studentRollNo :any = null
  studentId:any=null;
  studentDataModelObj:studentDataModel = new studentDataModel();

  constructor(private formbuilder:FormBuilder,
              private api:ApiService,
              private route: ActivatedRoute,
              private http:HttpClient){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({ 
      rollNo:['',[Validators.required]],
      name:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      score:['',[Validators.required]]
    })

    this.route.queryParams.subscribe((params:any)=>{
      this.studentRollNo= params.data;
    })
     if(this.studentRollNo != null){
      console.log("hy");
      console.log(this.studentRollNo)
      this.http.get<any>("http://localhost:3000/studentRecords").subscribe(res=>{
      const student = res.find((a:any)=>{
        return a.rollNo == this.studentRollNo
      });
      this.studentId = student.id;
      this.formValue.controls['rollNo'].setValue(student.rollNo);
      this.formValue.controls['name'].setValue(student.name);
      this.formValue.controls['dateOfBirth'].setValue(student.dateOfBirth);
      this.formValue.controls['score'].setValue(student.score);
    })
  }
}

  //TO CLEAR INPUT FIELDS
  clearInput(){
    this.formValue.reset();
  }

  //SENDING STUDENT DATA TO JSON SERVER
  postStudentData(){
    this.studentDataModelObj.rollNo = this.formValue.value.rollNo;
    this.studentDataModelObj.name = this.formValue.value.name;
    this.studentDataModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.studentDataModelObj.score = this.formValue.value.score;
    //CONDITION TO CHECK WHETHER NEW RECORD ADDED OR PREVIOUS RECORD IS EDITED
    if(this.studentRollNo != null){
      this.editStudentRecord();
      this.studentRollNo=null;
    }
    else{
      this.api.postRecord(this.studentDataModelObj).subscribe(res=>{
        console.log(res);
        Swal.fire("Success","Student Data Added Successfully",'success');
        this.formValue.reset();
      },
      err=>{
        Swal.fire("Oops","Something went wrong. Try Again !!","error");
      })
    }
  }

  //IF PREVIOUS DATA EDITED THIS FUNCTION WILL BE CALLED
  editStudentRecord(){
    this.api.updateRecord(this.studentDataModelObj,this.studentId).subscribe(res=>{
      console.log(res);
      Swal.fire("Success","Student Data Edited Successfully",'success');
      this.formValue.reset();
    },
    err=>{
      Swal.fire("Oops","Something went wrong. Try Again !!","error");
    })
  }
  
}
