import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup;
  constructor(private formbuilder:FormBuilder,private router: Router, private api:ApiService) { }

  onClick(){
    this.router.navigateByUrl("/signup")
    }

  ngOnInit() {
    this.loginForm= this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],   
    })
  }
  login(){
    this.api.Login()
    .subscribe(res =>{
      const user =res.find((a:any)=>{
        console.log("a.email" +a.email+" a.password "+a.password)
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })

      if(user){
        alert("Login Success")
        this.loginForm.reset()
        this.router.navigate(["dashboard"])
      }
      else{
        alert("user not found")
      }
    },
    err=>{
      alert("Something went in login()")
    })
  }

}
