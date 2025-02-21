import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  dataComplete: any[] = [];
  marcas: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private marcaService: MarcaService) {}

  ngOnInit() {
    this.marcaService.getMarca()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        if (data && Array.isArray(data.menuItems) && data.menuItems.length > 0) {
          this.dataComplete = data.menuItems;
          this.marcas = this.getFilteredMarcas(this.dataComplete);
        } else {
          console.warn('No hay registros en la API.');
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

  onImageLoad(marcaNombre: string) {
    console.log(`Imagen de ${marcaNombre} cargada correctamente.`);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
