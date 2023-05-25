import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersManagementModule } from './orders-management/orders-management.module';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InitializeAppService } from './services/initialize.app.service';
import { effects } from './store/effects/effects';
import { reducers } from './store/reducers/reducers';

const useFactory = (init: InitializeAppService) => {
  return () => init.initializeApp();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdersManagementModule,
    ClarityModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory,
      deps: [InitializeAppService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
