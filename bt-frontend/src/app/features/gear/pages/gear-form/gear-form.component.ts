import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Band } from '../../../../core/models/band.model';
import { CreateGearDto, Gear, UpdateGearDto } from '../../../../core/models/gear.model';

@Component({
  standalone: true,
  selector: 'app-gear-form',
  imports: [],
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
    ownerId: [null],
    name: ['', Validators.required],

    type: [''],
    brand: [''],
    model: [''],
    serialNumber: [''],

    // photoUrl: [''],

    notes: [''],

    value: [0],
    valueCurrency: ['USD'],
    weight: [0],
    weightUnit: ['kg'],
    dimensions: [''],
  });

  ngOnInit() {
    const existing = this.band();
    if (existing) {
      this.isEditMode = true;
      this.form.patchValue({
        ...existing
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
      bandId: this.band().id,
      value: value.value || 0,
      weight: value.weight || 0
    }
  }
}