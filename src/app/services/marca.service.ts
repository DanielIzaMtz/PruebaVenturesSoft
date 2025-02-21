import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMarca(): Observable<any> {
    const params = new HttpParams().set('idMenu', '1001');

    return this.http.get(`${this.apiUrl}Marcas`, { params });
  }

  getMarcaById(idMenu: number): Observable<any> {
    const params = new HttpParams().set('idMenu', idMenu.toString());

    return this.http.get(`${this.apiUrl}Marcas`, { params });
  }
}
