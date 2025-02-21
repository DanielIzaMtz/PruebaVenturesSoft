import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}Categorias`);
  }
}
