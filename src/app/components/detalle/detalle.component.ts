import { Component } from '@angular/core';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  dataComplete: any[] = [];
  marcas: any[] = [];

  constructor(private marcaService: MarcaService) {
    this.marcaService.getMarca().subscribe(data => {
      this.dataComplete = data;
      this.marcas = this.getFilteredMarcas(data.menuItems);
    });
  }

  getFilteredMarcas(marcas: any[]): any[] {
    const uniqueMarcas = new Map<string, any>();

    // Expresión regular para eliminar los números al final del nombre
    const regex = /\d+$/;

    marcas.forEach(marca => {
      // Normalizar eliminando números al final y convirtiendo a minúsculas
      const normalizedNombre = marca.nombreMarca.replace(regex, '').trim().toLowerCase();

      if (!uniqueMarcas.has(normalizedNombre)) {
        uniqueMarcas.set(normalizedNombre, marca);
      }
    });

    // Convertir a array y ordenar alfabéticamente por 'nombreMarca'
    const sortedMarcas = Array.from(uniqueMarcas.values()).sort((a, b) =>
      a.nombreMarca.localeCompare(b.nombreMarca)
    );

    // Limitar a 4 registros
    return sortedMarcas.slice(0, 4);
  }
}
