import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuInterface } from "src/app/types/menu-interface";

const MENU: MenuInterface[] = [
  {
    icon: "list",
    text: "Listado",
    link: "/listado",
  },
  {
    icon: "search",
    text: "Buscar",
    link: "/buscar",
  },
  {
    icon: "edit",
    text: "Nuevo",
    link: "/nuevo",
  },
  {
    icon: "favs",
    text: "Favoritos",
    link: "/favoritos",
  },
];

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  menu: MenuInterface[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menu = MENU;
  }

  addIconFromSprite(icon: string) {
    return `assets/images/sprite.svg#${icon}`;
  }
}
