// features/bands/pages/band-list-page/band-list-page.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { BandCardComponent } from '../../components/band-card/band-card.component';
import { BandFormComponent } from '../../components/band-form/band-form.component';
import { BandActions } from '../../../../store/bands/band.actions';
import {
  selectAllBands,
  selectLoading,
  selectSaving,
  selectError
} from '../../../../store/bands/band.selectors';
import { CreateBandDto } from '../../../../core/services/band.service';

@Component({
  standalone: true,
  selector: 'app-band-list-page',
  imports: [BandCardComponent, BandFormComponent],
  templateUrl: './band-list-page.component.html'
})
export class BandListPageComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  bands = toSignal(this.store.select(selectAllBands), { initialValue: [] });
  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  saving = toSignal(this.store.select(selectSaving), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  // Local UI state — controls whether the create form is visible
  showCreateForm = signal(false);

  ngOnInit() {
    this.store.dispatch(BandActions.loadBands());
  }

  onEdit(id: number) {
    this.router.navigate(['/bands', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this band?')) {
      this.store.dispatch(BandActions.deleteBand({ id }));
    }
  }

  onCreateSubmit(dto: CreateBandDto) {
    this.store.dispatch(BandActions.createBand({ dto }));
  }

  onCreateCancel() {
    this.showCreateForm.set(false);
  }
}