import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaMarcaService } from '../../services/categoriaMarca/categoria-marca.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dataComplete = [];
  categorias: any[] = [];
  selectedCategory: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private categoriaMarcaService: CategoriaMarcaService
  ) {
    this.categoriaService.getCategoria().subscribe(data => {
      this.dataComplete = data;
      this.categorias = data.menuItems;

      if(data.error == false){
      }
    })
  }

  seleccionarCategoria(id: number) {
    this.selectedCategory = id;
    this.categoriaMarcaService.updateIdMenu(id);
  }

}
