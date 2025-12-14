import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-search-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form-component.html',
  styleUrl: './search-form-component.css',
})
export class SearchFormComponent {
  @Output() searchEvent = new EventEmitter<{ name: string, sfw: boolean, status: string }>();
  private fb = inject(FormBuilder);

  // Creamos el formulario usando nonNullable
  profileForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(1), noWhitespaceValidator]],
    sfw: [false, [Validators.required]],
    status: ["Airing", [Validators.required]]
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileForm.controls.name.setValue(this.profileForm.controls.name.value.trim());
      this.searchEvent.emit(this.profileForm.getRawValue());
    }
  }
}
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}


