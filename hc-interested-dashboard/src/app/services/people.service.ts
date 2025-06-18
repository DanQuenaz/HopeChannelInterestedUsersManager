import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'http://localhost:5000/interested-person';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/get-all`);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/update`, person);
  }

  updatePeople(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/update`, formData);
  }
}