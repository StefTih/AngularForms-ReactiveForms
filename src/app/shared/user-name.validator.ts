import {AbstractControl, ValidatorFn} from "@angular/forms";

 // The drawback of the validator function is that it can only accept one parameter. So we cannot simply
 // pass in a second parameter. Instead what we have to do is create a factory function that accepts a string
 // as a parameter and returns the validator function itself.
//  export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
//   const forbidden = /admin/.test(control.value);
//   return forbidden ? { 'forbiddenName': {value: control.value}} : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
