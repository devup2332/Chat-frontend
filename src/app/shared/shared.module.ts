import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [SnackbarComponent],
})
export class SharedModule {}
