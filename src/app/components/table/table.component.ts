import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface TableRow {
  label: string;
  values: boolean[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tableHeaders: string[] = ['TABLA.FILA1', 'TABLA.FILA2'];

  tableData: TableRow[] = [
    { label: 'TABLA.COLUMNA1', values: [true, true] },
    { label: 'TABLA.COLUMNA2', values: [false, true] },
    { label: 'TABLA.COLUMNA3', values: [false, true] },
    { label: 'TABLA.COLUMNA4', values: [false, true] },
    { label: 'TABLA.COLUMNA5', values: [false, true] },
    { label: '', values: [false, true] },
    { label: '', values: [false, true] }
  ];

}
