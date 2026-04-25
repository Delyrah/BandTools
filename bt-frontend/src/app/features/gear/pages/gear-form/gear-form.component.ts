import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gear-form',
  imports: [],
  templateUrl: './gear-form.component.html',
  styleUrl: './gear-form.component.scss',
})
export class GearFormComponent {
  private fb = inject(NonNullableFormBuilder);

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
}


    // id: number;
    // bandId: number;
    // ownerId?: number;
    // name: string;
    // type?: string;
    // brand?: string;
    // model?: string;
    // serialNumber?: string;
    // value?: number;
    // valueCurrency?: string;
    // photoUrl?: string;
    // notes?: string;
    // weight?: number;
    // weightUnit?: string;
    // dimensions?: string;