import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2'
import { UserModel } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel
  saveLogin: boolean

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel()
    this.saveLogin = false

    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email')
      this.saveLogin = true
    }
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
        if (this.saveLogin) {
          localStorage.setItem('email', this.user.email)
        }
        this.router.navigateByUrl('/home')
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
