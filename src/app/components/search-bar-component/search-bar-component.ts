import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css',
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<{ name: string }>();
  private fb = inject(FormBuilder);

  // Creamos el formulario usando nonNullable
  profileForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(1), noWhitespaceValidator]]
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