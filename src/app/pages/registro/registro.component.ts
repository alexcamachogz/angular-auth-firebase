import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2'
import { UserModel } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserModel
  saveLogin: boolean

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel()
    this.saveLogin = false
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    })
    Swal.showLoading()

    this.auth.newUser(this.user).subscribe(
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
          title: 'Error al crear cuenta',
          text: err.error.error.message
        })
      }
    )
  }
}
