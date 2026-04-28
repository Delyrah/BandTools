import { Component, input, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInput],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  control = input.required<FormControl>()
  label = input.required<string>();
  placeholder = input<string>();
  type = input<'text' | 'number' | 'date' | 'url'>('text');

  size = input<'full' | 'half'>('full');
  // @Input({ required: true }) control!: FormControl;
  // @Input({ required: true }) label!: string;
  // @Input() placeholder = '';
  // @Input() type = 'text';
}