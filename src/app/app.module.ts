import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ModalComponent } from "./modal/modal.component";

import { ContactProfileComponent } from "./contact-profile/contact-profile.component";
import { ConfirmationDirective } from "./directives/confirmation.directive";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    ContactFormComponent,
    ModalComponent,
    ContactProfileComponent,
    ConfirmationDirective,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
