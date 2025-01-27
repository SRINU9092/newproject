import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './signup/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  
  constructor(private http: HttpClient) { }

  // Fetch bus details
  getbusdetails(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/data/busdata`);
  }

  // Edit bus details
  editBusDetails(id: number, updatedBusDetails: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/data/busdata/${id}`, updatedBusDetails);
  }

  deleteBusDetails(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/data/busdata/${id}`);
  }
  addNewBus(busdetails: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/data/addnewbusdata`, busdetails);
  }
}
