import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserProfile } from 'src/app/dtos/signIn.dto';
import { LoginAction } from 'src/app/store/actions/login.action';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: []
})
export class MenuMainComponent {
  userProfile?: UserProfile;

  constructor(private store: Store<AppState>) {
    this.store.subscribe({
      next: (state) => this.userProfile = state.authenticatedUser.userProfile ?? undefined,
    })
  }
}
