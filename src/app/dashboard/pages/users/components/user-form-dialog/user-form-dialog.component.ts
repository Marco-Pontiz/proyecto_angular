import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noSebastianValidator } from 'src/app/shared/utils/form-validators';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent {

  nameControl = new FormControl< string | null >(null, [
    Validators.required, 
    Validators.minLength(2),
    noSebastianValidator(),
  ]);

  surnameControl = new FormControl< string | null >(null, [
    Validators.required, 
    Validators.minLength(2)
  ]);

  emailControl = new FormControl< string | null > (null , [
    Validators.required
  ]);
  passwordControl = new FormControl< string | null > (null ,[
    Validators.required
  ]);
  
  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl
  }); 

   // userForm: FormGroup; 

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User,
  ) {
/*  this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.min(2), noSebastianValidator()]],
      surname: [null, [Validators.required, Validators.min(2)]],

    }); */

    if(this.data){
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.passwordControl.setValue(this.data.password);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {      
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    } 
  }
}
