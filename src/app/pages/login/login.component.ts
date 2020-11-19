import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2'
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

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    })
    Swal.showLoading()

    this.auth.login(this.user).subscribe(
      () => {
        Swal.close()
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: err.error.error.message
        })
      }
    )
  }
}
