import { Component, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Band } from '../../../../core/models/band.model';
import { CreateBandDto, UpdateBandDto } from '../../../../core/services/band.service';

@Component({
  standalone: true,
  selector: 'app-band-form',
  imports: [ReactiveFormsModule],
  templateUrl: './band-form.component.html'
})
export class BandFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  // If band is provided, we're editing. If null, we're creating.
  band = input<Band | null>(null);
  saving = input<boolean>(false);
  submitForm = output<CreateBandDto | UpdateBandDto>();
  cancel = output<void>();

  isEditMode = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    genre: ['', Validators.maxLength(50)],
    founded: [''],
    bio: ['', Validators.maxLength(1000)],
    logoUrl: ['']
  });

  get name() { return this.form.controls.name; }
  get genre() { return this.form.controls.genre; }
  get bio() { return this.form.controls.bio; }

  ngOnInit() {
    const existing = this.band();
    if (existing) {
      this.isEditMode = true;
      this.form.patchValue({
        name: existing.name,
        genre: existing.genre ?? '',
        founded: existing.founded ?? '',
        bio: existing.bio ?? '',
        logoUrl: existing.logoUrl ?? ''
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    // Strip empty strings to undefined so the API doesn't overwrite with empty
    const dto: CreateBandDto | UpdateBandDto = {
      name: value.name!,
      genre: value.genre || undefined,
      founded: value.founded || undefined,
      bio: value.bio || undefined,
      logoUrl: value.logoUrl || undefined
    };

    this.submitForm.emit(dto);
  }
}