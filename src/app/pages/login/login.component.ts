import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { UserModel } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = new UserModel()
  }

  login(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.auth.login(this.user).subscribe(
      (resp) => {
        console.log(resp)
      },
      (err) => {
        console.log(err.error.error.message)
      }
    )
  }
}
