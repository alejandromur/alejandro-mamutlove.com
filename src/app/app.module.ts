import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";

import { environment } from "../environments/environment";
import { NavComponent } from "./components/shared/nav/nav.component";
import { OwlComponent } from "./components/shared/owl/owl.component";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { FormComponent } from "./components/form/form.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OwlComponent,
    ListComponent,
    SearchComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
