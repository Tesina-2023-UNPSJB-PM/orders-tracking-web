import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersManagementModule } from './orders-management/orders-management.module';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from './core/core.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InitializeAppService } from './services/initialize.app.service';
import { effects } from './store/effects/_effects';
import { reducers } from './store/reducers/_reducers';
import { SharedModule } from './shared/shared.module';
import { OrdersTrackingModule } from './orders-tracking/orders-tracking.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthModule } from './auth/auth.module';
import { AuthJwtInterceptor } from './interceptors/authJwt.interceptor';

const useFactory = (init: InitializeAppService) => {
  return () => init.initializeApp();
};

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OrdersManagementModule,
    OrdersTrackingModule,
    AuthModule,
    SharedModule,
    ClarityModule,
    CoreModule,
    HttpClientModule,
    GoogleMapsModule,
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
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
