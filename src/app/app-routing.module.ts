import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { FormComponent } from "./components/form/form.component";
import { OwlComponent } from "./components/shared/owl/owl.component";

const routes: Routes = [
  {
    path: "listado",
    component: ListComponent
  },
  {
    path: "buscar",
    component: SearchComponent
  },
  {
    path: "nuevo",
    component: FormComponent
  },
  {
    path: "detalle/:id",
    component: OwlComponent
    // children: [
    //   { path: "entrada", component: EntryComponent },
    //   { path: "tarea", component: TaskComponent }
    // ]
  },
  { path: "", redirectTo: "/listado", pathMatch: "full" },
  { path: "**", redirectTo: "/listado" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
