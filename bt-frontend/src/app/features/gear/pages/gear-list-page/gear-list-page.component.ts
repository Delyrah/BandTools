import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { GearActions } from '../../../../store/gear/gear.actions';
import { selectAllGear } from '../../../../store/gear/gear.selectors';

@Component({
  selector: 'app-gear-list-page',
  imports: [],
  templateUrl: './gear-list-page.component.html',
  styleUrl: './gear-list-page.component.scss',
})
export class GearListPageComponent {
  private store = inject(Store);

  gear = toSignal(this.store.select(selectAllGear));
}
