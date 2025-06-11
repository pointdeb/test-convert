import { Routes } from '@angular/router';
import { ConvertPageComponent } from './pages/convert-page/convert-page.component';

export const routes: Routes = [
    { path: '', component: ConvertPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
