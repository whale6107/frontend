import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from '../shared/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private tokenStorage: TokenStorage
  ) { }

  ngOnInit() {
      sessionStorage.setItem('token', '');
  }

  login() {
    let url = 'api/auth';
    this.http.post<Observable<any>>(url, {
      username: this.model.username,
      password: this.model.password
  }).subscribe(
      (rsp) => {
        console.log('token', rsp);
        if (rsp.token) {
        this.tokenStorage.saveToken(rsp.token);
        this.router.navigate(['/home']);
        }
      },
      (error) => {
        alert("Authentication failed.")
      }
  );
}



}
