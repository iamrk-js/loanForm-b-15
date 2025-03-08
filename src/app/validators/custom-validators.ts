import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators {

    static panCardValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value?.toUpperCase(); // Case-insensitive
            const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            return regex.test(value) ? null : { invalidPanCard: true };
        };
    }

    // Aadhar card validation (12 digits)
    static aadharCardValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const regex = /^\d{12}$/;
            return regex.test(value) ? null : { invalidAadharCard: true };
        };
    }

    // Phone number validation (10 digits, starts with 6,7,8,9)
    static phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const regex = /^[6-9]\d{9}$/; // Indian mobile number regex
            return regex.test(value) ? null : { invalidPhoneNumber: true };
        };
    }

    // Date of Birth validation (must be at least 18 years old)
    static dateOfBirthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const dob = moment(value, 'YYYY-MM-DD');
            const today = moment();
            const age = today.diff(dob, 'years');
            return age >= 18 ? null : { invalidDateOfBirth: true };
        };
    }

    // Loan amount validation (between 10,000 and 1,00,00,000)
    static loanAmountValidator(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return value >= min && value <= max ? null : { invalidLoanAmount: true };
        };
    }

    // Loan tenure validation (between 6 and 60 months)
    static loanTenureValidator(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return value >= min && value <= max ? null : { invalidLoanTenure: true };
        };
    }
}