import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noSebastianValidator } from 'src/app/shared/utils/form-validators';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent {
  editingUser?: User;
  nameControl = new FormControl< string | null >(null, [
    Validators.required, 
    Validators.minLength(2),
    noSebastianValidator(),
  ]);

  surnameControl = new FormControl< string | null >(null, [
    Validators.required, 
    Validators.minLength(2)
  ]);

  roleControl = new FormControl<string | null>(null, [Validators.required]);

  emailControl = new FormControl< string | null > (null , [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl< string | null > (null ,[
    Validators.required
  ]);
  
  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    role: this.roleControl,
    email: this.emailControl,
    password: this.passwordControl,
  }); 

   // userForm: FormGroup; 

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    if(this.data){
      this.editingUser = this.data;
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.roleControl.setValue(this.data.role);
      this.passwordControl.setValue(this.data.password);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {      
      this.userForm.markAllAsTouched();
    } else {
      const payload: any = {
        ...this.userForm.value
      }
      
      if(this.editingUser) {
        payload['token'] = this.editingUser.token;
      }

      this.dialogRef.close(payload);
    } 
  }
}
