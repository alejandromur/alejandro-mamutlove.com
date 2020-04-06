import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  owl: any;

  constructor(
    private router: Router,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.owl = this.firebaseService.getSelectedOwl();
  }

  onDelete(key: string) {
    this.firebaseService.delete(key);
    this.router.navigate(["/listado"]);
  }
}
