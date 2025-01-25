import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './app.config';

@Injectable({
  providedIn: 'root'
})

//
export class FetchApiDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  // Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // ============================
  // User-related endpoints
  // ============================

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'users/signup', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'users/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get All Users
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User by ID
  getUserById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/search/id/' + id, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User by Username
  getUserByUsername(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/search/username/' + username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Current User Profile
  getCurrentUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/profile/me', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update User Profile
  updateUserProfile(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'users/profile/update/' + username, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add Favorite Movie
  addFavoriteMovie(userId: string, title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.apiUrl + 'users/' + userId + '/favorite/' + title, {}, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Remove Favorite Movie
  removeFavoriteMovie(userId: string, title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'users/' + userId + '/favorite/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete User
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'users/profile/delete/' + userId, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Logout User
  logoutUser(): Observable<any> {
    return this.http.post(this.apiUrl + 'logout', {}).pipe(
      catchError(this.handleError)
    );
  }

  // ============================
  // Movie-related endpoints
  // ============================

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  searchMovies(queryParams: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/search', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      params: queryParams
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFeaturedMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/featured', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneMovieById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + id, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenreByName(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenreByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + title + '/genre', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirectorByName(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirectorByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + title + '/director', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}