import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecuperNomeComponent } from './pages/recuper-nome/recuper-nome.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecuperarsenhaComponent } from './pages/recuperarsenha/recuperarsenha.component';
import { RedefinirsenhaComponent } from './pages/redefinirsenha/redefinirsenha.component';
import { ShoplistComponent } from './pages/shoplist/shoplist.component';
import { ShoplistFerroComponent } from './pages/shoplist/shoplist-ferro/shoplist-ferro.component';
import { ShoplistPrataComponent } from './pages/shoplist/shoplist-prata/shoplist-prata.component';
import { ShoplistBronzeComponent } from './pages/shoplist/shoplist-bronze/shoplist-bronze.component';
import { ShoplistOuroComponent } from './pages/shoplist/shoplist-ouro/shoplist-ouro.component';
import { ShoplistPlatinaComponent } from './pages/shoplist/shoplist-platina/shoplist-platina.component';
import { ShoplistDiamenteComponent } from './pages/shoplist/shoplist-diamente/shoplist-diamente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    NotFoundComponent,
    RecuperNomeComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    RecuperarsenhaComponent,
    RedefinirsenhaComponent,
    ShoplistComponent,
    ShoplistFerroComponent,
    ShoplistPrataComponent,
    ShoplistBronzeComponent,
    ShoplistOuroComponent,
    ShoplistPlatinaComponent,
    ShoplistDiamenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
})

export class AppModule { }
