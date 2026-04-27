import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectSelectedBand } from '../../store/band/band.selectors';
import { NgStyle } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatNavList, MatListItem,
    MatListItemIcon, MatListItemTitle, MatIconModule, MatButtonModule,
    NgStyle
],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  authService = inject(AuthService);
  store = inject(Store);

  selectedBand = toSignal(this.store.select(selectSelectedBand), { initialValue: null });
}