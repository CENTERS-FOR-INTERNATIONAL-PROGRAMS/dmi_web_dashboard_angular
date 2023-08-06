import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { NumEnrolled } from '../models/numEnrolled.model';
import { CovidPositivity } from '../models/covidPositivity.model';
import { CovidPositivityOvertime } from '../models/covidPositivityOvertime.model';
import { CovidPositivityByAgeGender } from '../models/covidPositivityByAgeGender.model';
import { Covid19PositivityByGender } from '../models/covid19PositivityByGender.model';
import { Covid19OverallPositivityByFacility } from '../models/covid19OverallPositivityByFacility.model';


import { EnrollmentByGender } from '../models/enrollmentByGender.model';
import { EnrollmentByAgeGender } from '../models/enrollmentByAgeGender.model';
import { EnrollmentByFacility } from '../models/enrollmentByFacility.model';
import { EnrollmentByEpiWeek } from '../models/enrollmentByEpiWeek.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  // Overview -- //
  public BASE_URL  = 'http://localhost:8080/api/overview/findCovid19Positivity';
  public BASE_URL1 = 'http://localhost:8080/api/overview/findCovid19OverTime';
  public BASE_URL3 = 'http://localhost:8080/api/overview/findCovid19PositivityByAgeGender';
  public BASE_URL_BY_GENDER  = 'http://localhost:8080/api/overview/findCovid19PositivityByGender';
  public BASE_URL_BY_FACILITY  = 'http://localhost:8080/api/overview/findCovid19OverallPositivityByFacility';
  // Enrollment --//
  public BASE_URLE1 = 'http://localhost:8080/api/enrollment/findEnrollmentByGender';
  public BASE_URLE2 = 'http://localhost:8080/api/enrollment/findEnrollmentByAgeGender';
  public BASE_URLE3 = 'http://localhost:8080/api/enrollment/findEnrollmentByFacility';
  public BASE_URLE4 = 'http://localhost:8080/api/enrollment/findEnrollmentByEpiWeek';

  constructor(private http: HttpClient) {
  }

  findNumberEnrolledByFacility(): Observable<NumEnrolled[]> {
    console.log('In the service');
    return this.http.get<NumEnrolled[]>(`${this.BASE_URL}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19Positivity(): Observable<CovidPositivity[]> {
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

  findCovid19PositivityByGender(): Observable<Covid19PositivityByGender[]> {
    console.log('In the service');
    return this.http.get<Covid19PositivityByGender[]>( `${this.BASE_URL_BY_GENDER }`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19OverallPositivityByFacility(): Observable<Covid19OverallPositivityByFacility[]> {
    return this.http.get<Covid19OverallPositivityByFacility[]>( `${this.BASE_URL_BY_FACILITY }`).pipe(
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
  

  //#region Enrollment
  findEnrollmentByGender(): Observable<EnrollmentByGender[]> {
    return this.http.get<EnrollmentByGender[]>(`${this.BASE_URLE1}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  findEnrollmentByAgeGender(): Observable<EnrollmentByAgeGender[]> {
    return this.http.get<EnrollmentByAgeGender[]>(`${this.BASE_URLE2}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  findEnrollmentByFacility(): Observable<EnrollmentByFacility[]> {
    return this.http.get<EnrollmentByFacility[]>(`${this.BASE_URLE3}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  findEnrollmentByEpiWeek(): Observable<EnrollmentByEpiWeek[]> {
    return this.http.get<EnrollmentByEpiWeek[]>(`${this.BASE_URLE4}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //#endregion

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