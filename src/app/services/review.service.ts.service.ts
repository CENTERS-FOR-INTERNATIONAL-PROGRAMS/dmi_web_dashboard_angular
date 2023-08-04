import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { NumEnrolled } from '../models/numEnrolled.model';
import { CovidPositivity } from '../models/covidPositivity.model';
import { CovidPositivityOvertime } from '../models/covidPositivityOverTime.model';
import { CovidPositivityByAgeGender } from '../models/covidPositivityByAgeGender.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  public BASE_URL = 'http://localhost:8080/api/overview/findCovidPositivity';
  public BASE_URL1 = 'http://localhost:8080/api/overview/findCovid19OverTime';
  public BASE_URL3 = 'http://localhost:8080/api/overview/findCovid19PositivityByAgeGender';

  constructor(private http: HttpClient) {
  }

  findNumberEnrolledByFacility(): Observable<NumEnrolled[]> {
    console.log('In the service');
    return this.http.get<NumEnrolled[]>(`${this.BASE_URL}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovidPositivity(): Observable<CovidPositivity[]> {
    console.log('In the service');
    return this.http.get<CovidPositivity[]>(`${this.BASE_URL}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovidPositivityOvertime(): Observable<CovidPositivityOvertime[]> {
    console.log('In the service');
    return this.http.get<CovidPositivityOvertime[]>(`${this.BASE_URL1}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19PositivityByAgeGender(): Observable<CovidPositivityByAgeGender[]> {
    console.log('In the service');
    return this.http.get<CovidPositivityByAgeGender[]>(`${this.BASE_URL3}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}