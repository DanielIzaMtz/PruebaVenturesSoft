import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMarca(): Observable<any>{
    const idMenu = 1001;
    return this.http.get(`${this.apiUrl}Marcas?idMenu=${idMenu}`);
  }

  getMarcaById(idMenu: number): Observable<any>{
    return this.http.get(`${this.apiUrl}Marcas?idMenu=${idMenu}`);
  }
}
