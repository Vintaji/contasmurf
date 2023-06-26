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
import { ShoplistFerroComponent } from './pages/shoplist/shoplist-ferro/shoplist-ferro.component';
import { ShoplistBronzeComponent } from './pages/shoplist/shoplist-bronze/shoplist-bronze.component';
import { ShoplistPrataComponent } from './pages/shoplist/shoplist-prata/shoplist-prata.component';
import { ShoplistOuroComponent } from './pages/shoplist/shoplist-ouro/shoplist-ouro.component';
import { ShoplistPlatinaComponent } from './pages/shoplist/shoplist-platina/shoplist-platina.component';
import { ShoplistDiamenteComponent } from './pages/shoplist/shoplist-diamente/shoplist-diamente.component';

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
  },
  {
    path: 'shoplist',
    component: ShoplistComponent,
  },
  {
    path: 'shoplist-ferro',
    component: ShoplistFerroComponent,
  },
  {
    path: 'shoplist-bronze',
    component: ShoplistBronzeComponent,
  },
  {
    path: 'shoplist-prata',
    component: ShoplistPrataComponent,
  },
  {
    path: 'shoplist-ouro',
    component: ShoplistOuroComponent,
  },
  {
    path: 'shoplist-platina',
    component: ShoplistPlatinaComponent,
  },
  {
    path: 'shoplist-diamante',
    component: ShoplistDiamenteComponent,
  },
  {
    path: 'dashboard',
    component: AdminComponent,
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
