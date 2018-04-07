import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from './../../shared/models/user.model';
import { Messaage } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rml-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Messaage;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = new Messaage('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Messaage(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    console.log(this.form);
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      console.log(user);

      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['']);
        } else {
          this.showMessage('Incorrect password!');
        }
      } else {
        this.showMessage('This user does not exist.');
      }
    });
  }
}
