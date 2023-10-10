import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMainComponent } from './components/menu-main/menu-main.component';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';

import { ClarityIcons, mapMarkerIcon, mapIcon, tasksIcon, usersIcon, eraserIcon, searchIcon, checkCircleIcon, clockIcon, checkIcon } from '@cds/core/icon';

import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MenuMainComponent,
    SideNavComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    SharedModule
  ],
  exports: [MenuMainComponent, SideNavComponent]
})
export class CoreModule {
  constructor() {
    ClarityIcons.addIcons(mapMarkerIcon, mapIcon, tasksIcon, usersIcon, eraserIcon, searchIcon, checkCircleIcon, clockIcon, checkIcon);
  }
}
