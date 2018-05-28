import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import{AngularFirestoreModule} from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {ItemService} from './service/item.service';
let routes: Routes =
[
  {
  path:'home',
  component:HomeComponent,
  },
  {
  path:'product',
  component:ProductComponent,
  },
  {
  path:'contact',
  component:ContactComponent
  },
  {
  path:'about',
  component:AboutComponent,
  }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
