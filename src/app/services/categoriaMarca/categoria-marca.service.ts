  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CategoriaMarcaService {

    private idMenu = new BehaviorSubject <number>(1001);
    idMenu$ = this.idMenu.asObservable();

    //Metodo para actualizar el IdMenu
    updateIdMenu(id: number) {
      this.idMenu.next(id);
    }

    constructor() {

    }
  }
