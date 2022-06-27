import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-model';


@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css']
})
export class EmployeeDashbordComponent implements OnInit {


  formValue !:FormGroup;
  employeeModelObj :EmployeeModel = new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;

  constructor(private formbuilder:FormBuilder, private api:ApiService,private router: Router) {
    this.getEmployee()
   }

  ngOnInit() {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:[''],
    })
  }

  logout(){
    this.router.navigate(['login'])
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName= this.formValue.value.firstName;
    this.employeeModelObj.lastName= this.formValue.value.lastName;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.mobile= this.formValue.value.mobile;
    this.employeeModelObj.salary= this.formValue.value.salary;

    this.api.postEmployee( this.employeeModelObj)
    .subscribe(res=>{
      console.log("********************"+res)
      alert("Employee added successfully")
      this.getEmployee();
      let ref = document.getElementById('cancel');
      ref.click();

      this.formValue.reset();
    },
    err=>{
      alert("Something went in postEmployeeDetails()")
    }
    )
  }
  
  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      console.log(res)
      this.employeeData=res;
    },
    err=>{
      alert("Something went wrong in getemployee()")
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      this.getEmployee();
      alert("Employee Deleted Successfully")
     
    },
    err=>{
      alert("Something went wrong in deleteEmployee()")
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName= this.formValue.value.firstName;
    this.employeeModelObj.lastName= this.formValue.value.lastName;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.mobile= this.formValue.value.mobile;
    this.employeeModelObj.salary= this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      console.log(res)
      alert("Employee updated Successfully")
      this.getEmployee();
      let ref = document.getElementById('cancel');
      ref.click();
    },
    err=>{
      alert("Something went wrong in updateEmployeeDetails()")
    })
  }
}
