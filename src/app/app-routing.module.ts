import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { FormComponent } from "./components/form/form.component";
import { OwlComponent } from "./components/shared/owl/owl.component";
import { DetailsComponent } from "./components/details/details.component";

const routes: Routes = [
  {
    path: "listado",
    component: ListComponent,
  },
  {
    path: "buscar",
    component: SearchComponent,
  },
  {
    path: "nuevo",
    component: FormComponent,
    data: { action: "new" },
  },
  {
    path: "detalle/:id",
    component: DetailsComponent,
  },
  {
    path: "editar/:id",
    component: FormComponent,
    data: { action: "edit" },
  },
  { path: "", redirectTo: "/listado", pathMatch: "full" },
  { path: "**", redirectTo: "/listado" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
