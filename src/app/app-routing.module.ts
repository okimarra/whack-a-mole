import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameScreenComponent } from './general/public/pages/game-screen/game-screen.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "init",
  },
  {
    path: 'init',
    component: GameScreenComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "init",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
