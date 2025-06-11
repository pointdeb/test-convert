import { Component, inject } from '@angular/core';
import { ConvertFormComponent } from '../../forms/convert-form/convert-form.component';
import { convertStore } from '../../stores';
import { Convert } from '../../models';
import { ConvertHistoryTableComponent } from '../../tables/convert-history-table/convert-history-table.component';

@Component({
  selector: 'app-convert-page',
  imports: [ConvertFormComponent, ConvertHistoryTableComponent],
  templateUrl: './convert-page.component.html',
  styleUrl: './convert-page.component.scss'
})
export class ConvertPageComponent {
  convertStore = inject(convertStore);

  handleSubmit(value: Convert) {
    this.convertStore.saveConvertion(value);
  }
}
