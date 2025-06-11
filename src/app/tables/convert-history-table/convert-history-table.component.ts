import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { Convert } from '../../models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-convert-history-table',
  imports: [MatTableModule, MatCheckbox, CurrencyPipe],
  templateUrl: './convert-history-table.component.html',
  styleUrl: './convert-history-table.component.scss'
})
export class ConvertHistoryTableComponent {
  @Input() items!: Convert[];

  displayedColumns = ['changeRate', 'manual', 'fromAmount', 'toAmount'];
}
