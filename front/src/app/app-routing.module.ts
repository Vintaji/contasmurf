import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth.guard';

import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecuperNomeComponent } from './pages/recuper-nome/recuper-nome.component';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['user']
    }
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin']
    }
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['user']
    }
  },
  {
    path: 'recuperarnome',
    component: RecuperNomeComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
