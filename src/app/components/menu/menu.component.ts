import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaMarcaService } from '../../services/categoriaMarca/categoria-marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dataComplete = [];
  categorias: any[] = [];
  selectedCategory: number | null = null;
  private subscription: Subscription;

  constructor(
    private categoriaService: CategoriaService,
    private categoriaMarcaService: CategoriaMarcaService
  ) {
    this.subscription = this.categoriaService.getCategoria().subscribe({
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
