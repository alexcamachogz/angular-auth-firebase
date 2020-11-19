import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { UserModel } from '../../models/user.model'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserModel

  // constructor() {}

  ngOnInit() {
    this.user = new UserModel()
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    console.log(this.user)
    console.log(form)
  }
}
