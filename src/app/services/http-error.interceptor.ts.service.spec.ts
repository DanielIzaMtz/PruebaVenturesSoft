import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorTsService } from './http-error.interceptor.ts.service';

describe('HttpErrorInterceptorTsService', () => {
  let service: HttpErrorInterceptorTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorInterceptorTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
