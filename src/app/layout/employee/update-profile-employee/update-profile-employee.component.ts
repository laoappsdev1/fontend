import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/service/employee.service';

@Component({
  selector: 'app-update-profile-employee',
  templateUrl: './update-profile-employee.component.html',
  styleUrls: ['./update-profile-employee.component.css']
})
export class UpdateProfileEmployeeComponent implements OnInit {
  id:number;
  user_id:number;
  village_id:number; 
  username:string;
  password:string;
  tel:string;
  usertype:string;
  first_name:string;
  last_name:string;
  dob:string;
  remark:string;
  gender:string; 
  status:string; 

  constructor(
    private employeeservice: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.employeeservice.viewEmployee) {
      const res=this.employeeservice.viewEmployee; 
      this.id=res.id;
        this.user_id=res.user_id;
        this.username=res.username;
        this.password=res.password;
        this.first_name=res.first_name;
        this.last_name=res.last_name;
        this.status=res.status;
        this.gender=res.gender;
        this.usertype=res.usertype;
        this.tel=res.tel;
        this.remark=res.remark; 
        this.village_id=res.village_id;
        this.dob=res.dob;
    }else{
      this.router.navigate(['/layout/employee'])
    }
  }
  
  saveEmployee(){
    const employee:IEmployee={}as IEmployee;
    employee.id=this.id;
    employee.user_id=this.id;
    employee.village_id=this.id;
    employee.username=this.username;
    employee.first_name=this.first_name;
    employee.last_name=this.last_name;
    employee.status=this.status;
    employee.gender=this.gender;
    employee.tel=this.tel;
    employee.dob=this.dob;
    employee.remark=this.remark;
    employee.usertype=this.usertype;
    employee.token=""; 
    this.employeeservice.update(employee); 
    this.router.navigate(['/layout/employee']); 
  }
}
