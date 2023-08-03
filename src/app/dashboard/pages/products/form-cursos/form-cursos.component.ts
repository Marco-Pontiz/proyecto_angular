import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrls: ['./form-cursos.component.css']
})
export class FormCursosComponent {
  nameControl = new FormControl(null, [
    Validators.required
  ]);

  descriptionControl = new FormControl(null,[
    Validators.required
  ]);
  priceControl = new FormControl([
    Validators.required
  ]);
  stockControl = new FormControl([
    Validators.required
  ]);

  cursoForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    stock: this.stockControl
  })

  onSubmit(): void {
    alert(JSON.stringify(this.cursoForm.value));
  }
}
