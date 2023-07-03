import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value.userName, this.form.value.password);
  }

}
