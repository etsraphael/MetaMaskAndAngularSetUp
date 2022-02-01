import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { SignComponent } from './page/sign/sign.component';

const routes: Routes = [

  // by default
  { path: '', redirectTo: 'sign', pathMatch: 'full' },

  // sign in page
  {
    path: 'sign',
    component: SignComponent,
  },

  // home page
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
