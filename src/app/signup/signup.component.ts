import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
 
  constructor(private formbuilder: FormBuilder, private router: Router, private api:ApiService) { }

  onClick() {
    this.router.navigateByUrl("/login")
  }

  ngOnInit() {
    this.signupForm= this.formbuilder.group({
      fullName:['',Validators.required],
      mobile:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],   
    })
  }
  signUp(){
    this.api.signUp(this.signupForm.value)
    .subscribe(res=>{
      console.log(res)
      alert("User Created Successfully")
      this.signupForm.reset()
      this.router.navigateByUrl("/login")
    },
    err=>{
      alert("Something went wrong in signUp()")
    })
  }

}
