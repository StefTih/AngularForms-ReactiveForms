import {AbstractControl, Validators} from "@angular/forms";

export function emailConditionallyRequiredValidator(formControl: AbstractControl) {
  if (!formControl.parent) {
    return null;
  }

  if (formControl.parent.get('subscribe')?.value) {
    return Validators.required(formControl);
  }

  return null;
}
