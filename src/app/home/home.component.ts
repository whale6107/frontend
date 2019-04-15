import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
      let url = '/api/user';
      let headers = new HttpHeaders({
          'Authorization': 'Basic ' + sessionStorage.getItem('token')
      });
      let options = { headers: headers };
      this.http.post(url,{}, options).
      subscribe(principal => {
          console.log('principal', principal);
          this.userName = principal.name;
      });


  }

  logout() {
      sessionStorage.setItem('token', '');
  }

}
