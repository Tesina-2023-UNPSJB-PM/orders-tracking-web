import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMainComponent } from './components/menu-main/menu-main.component';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import { ClarityIcons, mapMarkerIcon, organizationIcon, tasksIcon, usersIcon } from '@cds/core/icon';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [
    MenuMainComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule
  ],
  exports: [MenuMainComponent, SideNavComponent]
})
export class CoreModule {
  constructor() {
    ClarityIcons.addIcons(mapMarkerIcon, organizationIcon, tasksIcon, usersIcon);
  }
}
