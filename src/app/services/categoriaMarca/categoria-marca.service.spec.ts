import { TestBed } from '@angular/core/testing';

import { CategoriaMarcaService } from './categoria-marca.service';

describe('CategoriaMarcaService', () => {
  let service: CategoriaMarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaMarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
