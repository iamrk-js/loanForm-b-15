import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {
  BASE_URL = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }

  applyLoan(loanData: any) {
    return this.http.post(this.BASE_URL + '/api/loans/apply', loanData);
  }

  getUserLoans() {
    return this.http.get(this.BASE_URL + '/api/loans/my-loans');
  }

  getAllLoans() {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.get(this.BASE_URL + '/api/loans/all', { headers });
  }

  // getAllLoans(): Observable<any> {
  //   const token = localStorage.getItem('token'); // Get the token from localStorage
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header

  //   return this.http.get(this.BASE_URL+'api/loans/all', { headers });
  // }

  updateLoanStatus(loanId: string, status: string) {
    return this.http.patch(`${this.BASE_URL}/api/loans/${loanId}/status`, { status });
  }
}