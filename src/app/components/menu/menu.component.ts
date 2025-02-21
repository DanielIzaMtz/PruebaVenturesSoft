import { Component, OnDestroy } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaMarcaService } from '../../services/categoriaMarca/categoria-marca.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {

  dataComplete = [];
  categorias: any[] = [];
  selectedCategory: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private categoriaService: CategoriaService,
    private categoriaMarcaService: CategoriaMarcaService
  ) {
    this.categoriaService.getCategoria()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          if (data && !data.error) {
            this.dataComplete = data;
            this.categorias = data.menuItems ? data.menuItems : [];
          } else {
            console.error('Error en la respuesta de getCategoria:', data);
          }
        },
        error: err => console.error('Error en la llamada a getCategoria:', err)
      });
  }

  seleccionarCategoria(id: number) {
    this.selectedCategory = id;
    this.categoriaMarcaService.updateIdMenu(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
