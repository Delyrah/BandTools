import { Component, input, output } from '@angular/core';
import { Band } from '../../../../core/models/band.model';

@Component({
  standalone: true,
  selector: 'app-band-card',
  templateUrl: './band-card.component.html'
})
export class BandCardComponent {
  band = input.required<Band>();
  edit = output<number>();
  delete = output<number>();
}