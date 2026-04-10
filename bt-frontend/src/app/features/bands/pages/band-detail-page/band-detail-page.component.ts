import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { toSignal } from '@angular/core/rxjs-interop';
import { Band } from '../../../../core/models/band.model';
import { BandFormComponent } from '../../components/band-form/band-form.component';
import { BandMemberListComponent } from '../../components/band-member-list/band-member-list.component';
import { BandActions } from '../../../../store/band/band.actions';
import {
  selectBandEntities,
  selectLoading,
  selectSaving,
  selectError
} from '../../../../store/band/band.selectors';
import { UpdateBandDto } from '../../../../core/services/band.service';

@Component({
  standalone: true,
  selector: 'app-band-detail-page',
  imports: [BandFormComponent, BandMemberListComponent],
  templateUrl: './band-detail-page.component.html'
})
export class BandDetailPageComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  // Bound from route param :id via withComponentInputBinding
  id = input.required<string>();

  private entities = toSignal(this.store.select(selectBandEntities), { initialValue: {} as Dictionary<Band> });
  band = computed(() => this.entities()[this.id()] ?? null);

  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  saving = toSignal(this.store.select(selectSaving), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  isEditing = signal(false);

  ngOnInit() {
    this.store.dispatch(BandActions.loadBand({ id: Number(this.id()) }));
  }

  onEditSubmit(dto: UpdateBandDto) {
    this.store.dispatch(BandActions.updateBand({ id: Number(this.id()), dto }));
    this.isEditing.set(false);
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this band? This cannot be undone.')) {
      this.store.dispatch(BandActions.deleteBand({ id: Number(this.id()) }));
      // Effect handles navigation back to /bands
    }
  }

  onBack() {
    this.router.navigate(['/bands']);
  }
}