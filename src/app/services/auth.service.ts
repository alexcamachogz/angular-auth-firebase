import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private apikey = 'AIzaSyDQV_BO6veCV53x7HOjJJiXL0zPmEhC2ps'

  userToken: string

  constructor(private http: HttpClient) {
    this.readToken()
  }

  logout() {
    localStorage.removeItem('token')
  }

  login(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          this.saveToke(resp['idToken'])
          return resp
        })
      )
  }

  newUser(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }

    return this.http
      .post(`${this.url}signUp?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          this.saveToke(resp['idToken'])
          return resp
        })
      )
  }

  private saveToke(idToken: string) {
    this.userToken = idToken
    localStorage.setItem('token', idToken)
    const today = new Date()
    today.setSeconds(3600)
    localStorage.setItem('expire', today.getTime().toString())
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = ''
    }

    return this.userToken
  }

  isAuth(): boolean {
    if (this.userToken.length < 2) {
      return false
    }

    const expire = Number(localStorage.getItem('expire'))
    const expireToday = new Date()
    expireToday.setTime(expire)
    if (expireToday > new Date()) {
      return true
    } else {
      return false
    }
  }
}
