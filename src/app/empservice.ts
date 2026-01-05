import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Empservice {
  baseUrl='https://localhost:44325/api/employee'
  constructor(private http:HttpClient){}
  //get//
  GetEmpall()
  {
    return  this.http.get(this.baseUrl)
  }
  //save//
  
  addEmployee(data:any):Observable<any>{
    console.log(data);
    return this.http.post(this.baseUrl, data);
  }
  
  //delete//delete employee
  EmpDelete(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  //update employee//
  UpdateEmployee(id:number,data:any):Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${id}`,data);

  }
}