import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { UserModel } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserModel

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = new UserModel()
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.auth.newUser(this.user).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err.error.error.message)
      }
    )
  }
}
