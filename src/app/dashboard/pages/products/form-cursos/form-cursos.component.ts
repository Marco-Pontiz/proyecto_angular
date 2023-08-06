import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../models';


@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrls: ['./form-cursos.component.css']
})
export class FormCursosComponent {
  nameControl = new FormControl<string | null>(null, [
    Validators.required
  ]);

  descriptionControl = new FormControl<string | null>(null,[
    Validators.required
  ]);
  priceControl = new FormControl<number | null>(null,[
    Validators.required
  ]);
  stockControl = new FormControl<number | null>(null,[
    Validators.required
  ]);

  cursoForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    stock: this.stockControl
  })

  constructor(
    private dialogRef: MatDialogRef<FormCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Product,
    ) {
      if(this.data) {
        this.nameControl.setValue(this.data.name);
        this.descriptionControl.setValue(this.data.description);
        this.priceControl.setValue(this.data.price);
        this.stockControl.setValue(this.data.stock);
      }
  }

  onSubmit(): void {
    if(this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.cursoForm.value);
    }

  }
}
