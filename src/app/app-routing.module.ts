import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { WinComponent } from './components/win/win.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'game', component: GameBoardComponent },
  { path: 'game-over', component: GameOverComponent },
  { path: 'win', component: WinComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
