import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Band } from '../../../../core/models/band.model';

@Component({
  standalone: true,
  selector: 'app-band-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './band-card.component.html',
  styleUrl: './band-card.component.scss'
})
export class BandCardComponent {
  band = input.required<Band>();
  edit = output<number>();
  delete = output<number>();
}