import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule]
})
export class SharedModule {}
