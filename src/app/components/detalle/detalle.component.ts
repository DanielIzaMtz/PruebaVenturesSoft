import { Component } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  dataComplete: any[] = [];
  marcas: any[] = [];
  private subscription: Subscription | null = null;

  constructor(private marcaService: MarcaService) {
    this.subscription = this.marcaService.getMarca().subscribe({
      next: (data) => {
        if (data && data.menuItems) {
          this.dataComplete = data.menuItems;
          this.marcas = this.getFilteredMarcas(this.dataComplete);
        } else {
          console.warn('La respuesta de la API no contiene menuItems:', data);
          this.marcas = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener marcas:', err);
        this.marcas = [];
      }
    });
  }

  getFilteredMarcas(marcas: any[]): any[] {
    const uniqueMarcas = new Map<string, any>();
    const regex = /\d+$/;

    marcas.forEach(marca => {
      if (marca.nombreMarca) {
        const normalizedNombre = marca.nombreMarca.replace(regex, '').trim().toLowerCase();
        if (!uniqueMarcas.has(normalizedNombre)) {
          uniqueMarcas.set(normalizedNombre, marca);
        }
      }
    });

    const sortedMarcas = Array.from(uniqueMarcas.values()).sort((a, b) =>
      a.nombreMarca.localeCompare(b.nombreMarca)
    );

    return sortedMarcas.slice(0, 4);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
