import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

import { Covid19Summary } from '../models/covid19Summary.model';
import { NumEnrolled } from '../models/numEnrolled.model';

import { CovidPositivity } from '../models/covidPositivity.model';
import { CovidPositivityOvertime } from '../models/covidPositivityOvertime.model';
import { CovidPositivityByAgeGender } from '../models/covidPositivityByAgeGender.model';

import { Covid19PositivityByGender } from '../models/covid19PositivityByGender.model';
import { Covid19OverallPositivityByFacility } from '../models/covid19OverallPositivityByFacility.model';


import { EnrollmentByGender } from '../models/enrollmentByGender.model';
import { EnrollmentByAgeGender } from '../models/enrollmentByAgeGender.model';
import { EnrollmentByFacility } from '../models/enrollmentByFacility.model';
import { EnrollmentOverTime } from '../models/enrollmentOverTime.model';


import { ScreeningByGender } from '../models/screeningByGender.model';
import { ScreeningByAgeGender } from '../models/screeningByAgeGender.model';
import { ScreeningByFacility } from '../models/screeningByFacility.model';
import { ScreeningByOverTime } from '../models/screeningByOvertime.model';

import { Covid19ResultsByStatus } from '../models/covid19ResultsByStatus.model';
import { Covid19ResultsByFacility } from '../models/covid19ResultsByFacility.model';
import { Covid19ResultsByAgeGender } from '../models/covid19ResultsByAgeGender.model';
import { Covid19ResultsByPositivityOverTime } from '../models/covid19ResultsByPositivityOverTime.model';
import { Covid19Cascade } from '../models/covid19/covid19Cascade.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  // Overview -- //
  public BASE_URL_COVID19_SUMMARY = 'http://localhost:8080/api/overview/findCovid19Summary';
  public BASE_URL_COVID19_SUMMARYBYMONTH = 'http://localhost:8080/api/overview/findCovid19SummaryByMonth';
  public BASE_URL_CASCADE = 'http://localhost:8080/api/overview/findCovid19ScreeningEnrollmentCascade';
  public BASE_URL = 'http://localhost:8080/api/overview/findCovid19Positivity';
  public BASE_URL1 = 'http://localhost:8080/api/overview/findCovid19OverTime';
  public BASE_URL3 = 'http://localhost:8080/api/overview/findCovid19PositivityByAgeGender';
  public BASE_URL_BY_GENDER = 'http://localhost:8080/api/overview/findCovid19PositivityByGender';
  public BASE_URL_BY_FACILITY = 'http://localhost:8080/api/overview/findCovid19OverallPositivityByFacility';

  // Enrollment --// 
  public BASE_URLE1 = 'http://localhost:8080/api/covid19/enrollment/findByGender';
  public BASE_URLE2 = 'http://localhost:8080/api/covid19/enrollment/findByAgeGender';
  public BASE_URLE3 = 'http://localhost:8080/api/covid19/enrollment/findByFacility';
  public BASE_URLE4 = 'http://localhost:8080/api/covid19/enrollment/findOverTime';

  //Screening --//
  public BASE_URLES1 = 'http://localhost:8080/api/covid19/screening/findCascade';
  public BASE_URLES2 = 'http://localhost:8080/api/screening/findScreeningByAgeGender';
  public BASE_URLES3 = 'http://localhost:8080/api/screening/findScreeningByHealthFacilities';
  public BASE_URLES4 = 'http://localhost:8080/api/screening/findScreeningOverTime';

  //Results --//
  public BASE_URLR1 = 'http://localhost:8080/api/covid19/results/findByStatus';
  public BASE_URLR2 = 'http://localhost:8080/api/covid19/results/findByFacility';
  public BASE_URLR3 = 'http://localhost:8080/api/covid19/results/findByAgeGender';
  public BASE_URLR4 = 'http://localhost:8080/api/covid19/results/findByPositivityOverTime';

  constructor(private http: HttpClient) {
  }

  //#region Overview
  findSummary(): Observable<Covid19Summary[]> {
    return this.http.get<Covid19Summary[]>(`${this.BASE_URL_COVID19_SUMMARY}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findSummaryByMonth(): Observable<Covid19Summary[]> {
    return this.http.get<Covid19Summary[]>(`${this.BASE_URL_COVID19_SUMMARYBYMONTH}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19Cascade(): Observable<Covid19Cascade[]> {
    return this.http.get<Covid19Cascade[]>(`${this.BASE_URL_CASCADE}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
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
    return this.http.get<Covid19PositivityByGender[]>(`${this.BASE_URL_BY_GENDER}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19OverallPositivityByFacility(): Observable<Covid19OverallPositivityByFacility[]> {
    return this.http.get<Covid19OverallPositivityByFacility[]>(`${this.BASE_URL_BY_FACILITY}`).pipe(
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
  //#endregion

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

  findEnrollmentOverTime(): Observable<EnrollmentOverTime[]> {
    return this.http.get<EnrollmentOverTime[]>(`${this.BASE_URLE4}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //#endregion

  //#region Screening
  findCovid19ScreeningCascade(): Observable<Covid19Cascade[]> {
    return this.http.get<Covid19Cascade[]>(`${this.BASE_URLES1}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //#endregion

  //#region Results
  findCovid19ResultsByStatus(): Observable<Covid19ResultsByStatus[]> {
    return this.http.get<Covid19ResultsByStatus[]>(`${this.BASE_URLR1}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findScreeningByAgeGender(): Observable<ScreeningByAgeGender[]> {
    return this.http.get<ScreeningByAgeGender[]>(`${this.BASE_URLES2}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findScreeningByFacility(): Observable<ScreeningByFacility[]> {
    return this.http.get<ScreeningByFacility[]>(`${this.BASE_URLES3}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findScreeningByOvertime(): Observable<ScreeningByOverTime[]> {
    return this.http.get<ScreeningByOverTime[]>(`${this.BASE_URLES4}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19ResultsByFacility(): Observable<Covid19ResultsByFacility[]> {
    return this.http.get<Covid19ResultsByFacility[]>(`${this.BASE_URLR2}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19ResultsByAgeGender(): Observable<Covid19ResultsByAgeGender[]> {
    return this.http.get<Covid19ResultsByAgeGender[]>(`${this.BASE_URLR3}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  findCovid19ResultsByPositivityOverTime(): Observable<Covid19ResultsByPositivityOverTime[]> {
    return this.http.get<Covid19ResultsByPositivityOverTime[]>(`${this.BASE_URLR4}`).pipe(
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