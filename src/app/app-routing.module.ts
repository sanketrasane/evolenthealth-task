import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactListComponent } from "./contact-list/contact-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: ContactListComponent },
  { path: "contacts", component: ContactListComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
