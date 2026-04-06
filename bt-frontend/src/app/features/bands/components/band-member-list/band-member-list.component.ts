import { Component, input } from '@angular/core';
import { BandMember } from '../../../../core/models/member.model';

@Component({
  standalone: true,
  selector: 'app-band-member-list',
  templateUrl: './band-member-list.component.html'
})
export class BandMemberListComponent {
  members = input.required<BandMember[]>();
}