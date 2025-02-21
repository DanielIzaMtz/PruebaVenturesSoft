import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado';

        if (error.status === 404) {
          errorMessage = 'Error 404: Recurso no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error 500: Error interno del servidor';
        } else {
          errorMessage = `Error ${error.status}: ${error.message}`;
        }

        this.toastr.error(errorMessage, 'Error');
        console.error('Error HTTP:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
