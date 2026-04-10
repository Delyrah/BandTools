import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BandMember } from '../../../../core/models/member.model';

@Component({
  standalone: true,
  selector: 'app-band-member-list',
  imports: [MatListModule],
  templateUrl: './band-member-list.component.html',
  styleUrl: './band-member-list.component.scss'
})
export class BandMemberListComponent {
  members = input.required<BandMember[]>();
}