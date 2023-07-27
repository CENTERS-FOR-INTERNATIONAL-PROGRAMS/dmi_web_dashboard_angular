import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mdashboard',
  templateUrl: './mdashboard.component.html',
  styleUrls: ['./mdashboard.component.css']
})

export class MdashboardComponent implements OnInit { //Use HTTP 
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    const apiUrl = 'http://localhost:8080/users'; //api route for fetching all users
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }
}
