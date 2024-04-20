import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //SENDING DATA TO JSON SERVER
  postRecord(data:any){
    return this.http.post<any>("http://localhost:3000/studentRecords",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //SENDING DATA TO JSON SERVER
  getRecord(){
    return this.http.get<any>("http://localhost:3000/studentRecords")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //UPDATING DATA IN JSON SERVER
  updateRecord(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/studentRecords/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //DELETING DATA FROM JSON SERVER
  deleteRecord(id:number){
    return this.http.delete<any>("http://localhost:3000/studentRecords/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
