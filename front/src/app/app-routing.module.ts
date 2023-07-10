import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationExtras } from '@angular/router';
import { AuthGuard } from '../app/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecuperNomeComponent } from './pages/recuper-nome/recuper-nome.component';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecuperarsenhaComponent } from './pages/recuperarsenha/recuperarsenha.component';
import { RedefinirsenhaComponent } from './pages/redefinirsenha/redefinirsenha.component';
import { ShoplistComponent } from './pages/shoplist/shoplist.component';
import { EstoqueEloComponent } from './pages/admin/estoque-elo/estoque-elo.component';
import { EstoquePbeComponent } from './pages/admin/estoque-pbe/estoque-pbe.component';
import { ConstrucaoComponent } from './pages/construcao/construcao.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: ConstrucaoComponent
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
  },
  {
    path: 'shoplist',
    component: ShoplistComponent,
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estoque-elo',
    component: EstoqueEloComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estoque-pbe',
    component: EstoquePbeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recuperarnome',
    component: RecuperNomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recuperarsenha',
    component: RecuperarsenhaComponent,
  },
  {
    path: 'redefinirsenha',
    component: RedefinirsenhaComponent,
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
