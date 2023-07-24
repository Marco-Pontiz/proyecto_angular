import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { noSebastianValidator } from 'src/app/shared/utils/form-validators';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent {

  nameControl = new FormControl(null, [
    Validators.required, 
    Validators.minLength(2),
    noSebastianValidator(),
  ]);

  surnameControl = new FormControl(null, [
    Validators.required, 
    Validators.minLength(2)
  ]);

  emailControl = new FormControl(null , [
    Validators.required
  ]);
  passwordControl = new FormControl(null ,[
    Validators.required
  ]);
  
  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl
  });

  constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>) {
    
  }
  onSubmit(): void {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
