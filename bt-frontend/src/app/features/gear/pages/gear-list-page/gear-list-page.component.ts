import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { GearActions } from '../../../../store/gear/gear.actions';
import { selectAllGear, selectBandGear, selectError, selectLoading, selectSaving } from '../../../../store/gear/gear.selectors';
import { Router } from '@angular/router';
import { CreateGearDto } from '../../../../core/models/gear.model';
import { GearFormComponent } from '../../components/gear-form/gear-form.component';
import { selectCurrentBand } from '../../../../store/app.selectors';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectSelectedBand } from '../../../../store/band/band.selectors';

@Component({
  standalone: true,
  selector: 'app-gear-list-page',
  imports: [GearFormComponent, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './gear-list-page.component.html',
  styleUrl: './gear-list-page.component.scss',
})
export class GearListPageComponent {
  private store = inject(Store);
  private router = inject(Router);

  band = toSignal(this.store.select(selectSelectedBand), { initialValue: null });

  gear = toSignal(this.store.select(selectBandGear), { initialValue: [] });
  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  saving = toSignal(this.store.select(selectSaving), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  showCreateForm = signal(false);

  ngOnInit() {
    const bandId = this.band()?.id;
    if (bandId) {
      this.store.dispatch(GearActions.loadAllGearForBand({ id: bandId }));
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/bands', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this band?')) {
      this.store.dispatch(GearActions.deleteGear({ id }));
    }
  }

  onCreateSubmit(dto: CreateGearDto) {
    this.store.dispatch(GearActions.createGear({ dto }));
  }

  onCreateCancel() {
    this.showCreateForm.set(false);
  }
}
