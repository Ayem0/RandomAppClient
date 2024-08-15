import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { containLowerReg, containNumberReg, containSpaceReg, containUpperReg, onlyLettersOrNumbersReg } from './form-regex';

@Directive({
  selector: '[appFormValidator]',
  standalone: true
})
export class FormValidatorDirective {
  /** Return erreur si la string contient une minuscule sinon null */
  hasLower(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasLower = containLowerReg.test(value);
      return !hasLower ? { HasLower: true } : null;
    };
  }
  /** Return erreur si la string contient une majuscule sinon null */
  hasUpper(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpper = containUpperReg.test(value);
      return !hasUpper ? { hasUpper: true } : null;
    };
  }
  /** Return erreur si la string contient un nombre sinon null */
  hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = containNumberReg.test(value);
      return !hasNumber ? { hasNumber: true } : null;
    };
  }
  /** Return erreur si la string contient un epsace sinon null */
  hasSpace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasSpace = containSpaceReg.test(value);
      return hasSpace ? { hasSpace: true } : null;
    };
  }
  /** Return une erreur si les passwords ne match pas sinon null */
  passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue = control.get("password")?.value;
      const confirmPasswordValue = control.get("confirmPassword")?.value;
      if (!passwordValue || !confirmPasswordValue) {
        return null;
      }
      const passwordsMatch = passwordValue === confirmPasswordValue;
      return !passwordsMatch ? { passwordsMatch: true } : null;
    };
  }
  /** Return une erreur si la string ne contient pas que des lettres ou des nombres sinon null */
  onlyLettersOrNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const onlyLettersOrNumbers = onlyLettersOrNumbersReg.test(value);
      return !onlyLettersOrNumbers ? { onlyLettersOrNumbers: true } : null;
    };
  }
  /** Return une erreur si la string contient que des lettres ou des nombres sinon null */
  notOnlyLettersOrNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const notOnlyLettersOrNumbers = onlyLettersOrNumbersReg.test(value);
      return notOnlyLettersOrNumbers ? { notOnlyLettersOrNumbers: true } : null;
    };
  }
}
