import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Band } from '../../../../core/models/band.model';
import { CreateGearDto, Gear, UpdateGearDto } from '../../../../core/models/gear.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";

@Component({
  standalone: true,
  selector: 'app-gear-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormInputComponent],
  templateUrl: './gear-form.component.html',
  styleUrl: './gear-form.component.scss',
})
export class GearFormComponent {
  private fb = inject(NonNullableFormBuilder);

  gear = input<Gear | null>(null);
  band = input.required<Band>();
  saving = input<boolean>();
  submitForm = output<CreateGearDto | UpdateGearDto>();
  cancel = output<void>();

  isEditMode = false;

  form = this.fb.group({
    ownerId: [null as number | null],
    name: ['', Validators.required],

    type: [''],
    brand: [''],
    model: [''],
    serialNumber: [''],

    // photoUrl: [''],

    notes: [''],

    value: [null as number | null],
    valueCurrency: ['USD'],
    weight: [null as number | null],
    weightUnit: ['kg'],
    dimensions: [''],
  });

  ngOnInit() {
    const existing = this.gear();
    if (existing) {
      this.isEditMode = true;
      this.form.patchValue({
        ...existing,
        ownerId: existing.ownerId ?? null
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const dto: CreateGearDto | UpdateGearDto = {
      ...value,
      bandId: this.band().id,
      ownerId: undefined,
      value: value.value || 0,
      weight: value.weight || 0
    }

    this.submitForm.emit(dto);
  }
}