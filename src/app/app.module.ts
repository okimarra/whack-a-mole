import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameScreenComponent } from './general/public/pages/game-screen/game-screen.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { metaReducers, reducers } from './general/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './general/store/effects';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(AppEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
