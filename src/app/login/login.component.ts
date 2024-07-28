import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!:FormGroup;

constructor(private fb:FormBuilder,private authService:AuthService) { }
  ngOnInit() {
  this.formLogin=this.fb.group({
    username:this.fb.control(""),
    password:this.fb.control("")
  })
  }

  handlelogin() {

  let username=this.formLogin.value.username;
  let pwd=this.formLogin.value.password;
  this.authService.login(username,pwd.subscribe({
    next: data=>{
      this.authService.loadProfile(data);

    },
    error:err=>{
      console.log(err);

    }
  }))

  }
}
