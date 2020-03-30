import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuInterface } from "src/app/types/menu-interface";

const MENU: MenuInterface[] = [
  {
    text: "Listado",
    link: "/listado"
  },
  {
    text: "Buscar",
    link: "/buscar"
  },
  {
    text: "Nuevo",
    link: "/nuevo"
  }
];

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  menu: MenuInterface[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menu = MENU;
  }
}
