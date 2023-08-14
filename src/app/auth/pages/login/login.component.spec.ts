import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../auth.service";

describe('LoginComponent', () => {

    let component: LoginComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [LoginComponent],
                imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
            })
        component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('El formulario debe de ser invalido si los campos del mismo quedan en blanco', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('Al llamar login() y el formulario es invalido, se debe llamar el metodo markAllAsTouched de la propiedad loginForm',() => {
        //Aseguramos que el form sea invalido
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();

        //llamamos al login()
        const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.login()

        //Evaluamos si se llamo markAllAsTouched de loginForm
        expect(spyOfMarkAllAsTouched).toHaveBeenCalled()
    })

    it('Al llamar login() y el formulario SI ES VALIDO, debe haberse llamado el metodo login del AuthService', () => {
        const authService = TestBed.inject(AuthService);

        component.emailControl.setValue('fake@gmail.com');
        component.passwordControl.setValue('123456');

        expect(component.loginForm.valid).toBeTrue();
        
        const spyOnAuthServiceLogin = spyOn(authService, 'login');
        component.login();

        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    });
})