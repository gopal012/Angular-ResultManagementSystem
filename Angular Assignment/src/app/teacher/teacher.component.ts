import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  studentData !:any;
  constructor(private api:ApiService,
              private router:Router){}

  ngOnInit(): void {
    this.getAllStudentData();
  }

  getAllStudentData(){
    this.api.getRecord().subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudentData(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteRecord(row.id).subscribe(res=>{
          this.getAllStudentData();
        })
        Swal.fire('Deleted!','Student Record has been deleted.','success')
      }
    })
  }

  editEvent(studentData:any){
    console.log(studentData);
    this.router.navigate(['add-record'],{queryParams:{data:studentData.rollNo}});
  }
  
}
