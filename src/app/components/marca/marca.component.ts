import { Component } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CategoriaMarcaService } from '../../services/categoriaMarca/categoria-marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {

  page = 1;
  pageSize = 7;
  totalItems = 0;

  dataComplete = [];
  marcas: any[] = [];
  idMenu = 1001;

  constructor(
    private marcaService: MarcaService,
    private categoriaMarcaService: CategoriaMarcaService
  ){}

  ngOnInit() {
    this.categoriaMarcaService.idMenu$.subscribe((id) => {
      this.idMenu = id;
      this.obtenerMenu(id);
    });
    this.obtenerMenu(this.idMenu);
  }

  obtenerMenu(idMenu: number) {
    this.marcaService.getMarcaById(idMenu).subscribe((data) => {
      this.dataComplete = data.menuItems || []; 
      this.totalItems = this.dataComplete.length;
      this.page = 1;
      this.updatePage();
    });
  }

  updatePage() {
    if (this.page < 1) this.page = 1;
    if (this.page > Math.ceil(this.totalItems / this.pageSize)) {
      this.page = Math.ceil(this.totalItems / this.pageSize);
    }

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.marcas = this.dataComplete.slice(startIndex, endIndex);
  }

}
