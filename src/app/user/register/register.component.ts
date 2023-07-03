import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      phone: new FormControl(null, {validators: [Validators.required,]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      passwordSc: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    if(this.form.value.password === this.form.value.passwordSc)  {
      console.log('passwords are same');
      console.log('register works');
      this.authService.addUser(this.form.value.userName, 
        this.form.value.email, 
        this.form.value.phone, 
        this.form.value.password);
        this.form.reset();
    }


  }

}
