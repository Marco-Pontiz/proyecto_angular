import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noSebastianValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

    if (control instanceof FormControl) {
        if(typeof control.value === 'string' && control.value?.toLowerCase().includes('sebastian')) {
            return {
                noSebastian: true,
            }
        }
    }
        return null;
    };
}