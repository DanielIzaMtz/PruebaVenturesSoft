  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { MarcaService } from '../../services/marca.service';
  import { CategoriaMarcaService } from '../../services/categoriaMarca/categoria-marca.service';
  import { Subject, takeUntil } from 'rxjs';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

  @Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrls: ['./marca.component.css']
  })
  export class MarcaComponent implements OnInit, OnDestroy {

    page = 1;
    pageSize = 7;
    totalItems = 0;

    dataComplete = [];
    marcas: any[] = [];
    idMenu = 1001;
    isListView: boolean = false;

    sortCriteria: 'nombreMarca' | 'descripción' = 'nombreMarca';
    sortOrder: 'asc' | 'desc' = 'asc';

    private destroy$ = new Subject<void>();

    constructor(
      private marcaService: MarcaService,
      private categoriaMarcaService: CategoriaMarcaService,
      private sanitizer: DomSanitizer
    ){}

    ngOnInit() {
      this.categoriaMarcaService.idMenu$
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (id) => {
            this.idMenu = id;
            this.obtenerMenu(id);
          },
          error: (err) => console.error('Error en idMenu$', err)
        });

      this.obtenerMenu(this.idMenu);
    }

    obtenerMenu(idMenu: number) {
      this.marcaService.getMarcaById(idMenu)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data && data.menuItems) {
              this.dataComplete = data.menuItems;
              this.totalItems = this.dataComplete.length;
              this.page = 1;
              this.updatePage();
            } else {
              console.warn('La respuesta de la API no contiene menuItems:', data);
              this.dataComplete = [];
              this.totalItems = 0;
              this.marcas = [];
            }
          },
          error: (err) => {
            console.error('Error al obtener marcas:', err);
            this.dataComplete = [];
            this.totalItems = 0;
            this.marcas = [];
          }
        });
    }

    updatePage() {
      console.log("Datos de marcas:", this.marcas);
      if (this.totalItems === 0) {
        this.marcas = [];
        return;
      }

      const maxPage = Math.ceil(this.totalItems / this.pageSize);
      if (this.page > maxPage) this.page = maxPage;

      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.marcas = this.dataComplete.slice(startIndex, endIndex);
    }

    sortMarcas(criteria: 'nombreMarca' | 'descripción') {
      if (this.sortCriteria === criteria) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortCriteria = criteria;
        this.sortOrder = 'asc';
      }

      this.dataComplete.sort((a, b) => {
        const valueA = a[criteria] ? String(a[criteria]).toLowerCase() : '';
        const valueB = b[criteria] ? String(b[criteria]).toLowerCase() : '';

        if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      this.updatePage();
    }

    setListView() {
      this.isListView = true;
    }

    setGridView() {
      this.isListView = false;
    }

    getImageUrl(imageUrl: string): SafeUrl {
      if (!imageUrl) {
        return 'assets/placeholder.png';
      }
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }


    handleImageError(event: Event) {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = 'assets/placeholder.png';
    }


    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
