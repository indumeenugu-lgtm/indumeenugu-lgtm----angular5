import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Empservice } from '../empservice';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {
  employeeForm: FormGroup;
  empdata: any[] = [];
  isEditMode:boolean=false;
  editEmpId:number|null=null;

  constructor(private fb: FormBuilder, private empService: Empservice) {
    this.employeeForm = this.fb.group({
      empid: [''],
      empName: ['', Validators.required],
      salary: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  // ✅ Load all employees
  loadData() {
    this.empService.GetEmpall().subscribe((data: any) => {
      this.empdata = data;
    });
  }

  // ✅ Save (POST) new employee
 
onSubmit() {
  const payload = {
    empName: this.employeeForm.get('empName')?.value,
    salary: this.employeeForm.get('salary')?.value,
    gender: this.employeeForm.get('gender')?.value,
    location: this.employeeForm.get('location')?.value,
  };

  // ✅ Check if we are updating
  if (this.isEditMode && this.editEmpId !== null) {
    this.empService.UpdateEmployee(this.editEmpId, payload).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Employee updated successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.loadData();           // reload updated data
        this.employeeForm.reset(); // clear form
        this.isEditMode = false;   // reset edit mode
        this.editEmpId = null;     // clear ID
      });
    });
  } 
  // ✅ Else create new employee
  else {
    this.empService.addEmployee(payload).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Employee saved successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.loadData();
        this.employeeForm.reset();
      });
    });
  }
}


  // // ✅ Edit button (you can fill this later)
  // onEdit(obj: any) {
  //   this.isEditMode=true;
    this.editEmpId=obj.id;
    this.employeeForm.patchValue({
      empname:obj.empName,
      salary:obj.salary,
      gender:obj.gender,
      location:obj.gender
    });
  }
  

  // ✅ Delete employee with SweetAlert confirmation
  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This employee record will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.EmpDelete(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully!',
            confirmButtonText: 'OK'
          }).then(() => this.loadData());
        });
      }
    });
  } 
}
