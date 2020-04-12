import { Component, OnInit, Input } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-owl",
  templateUrl: "./owl.component.html",
  styleUrls: ["./owl.component.scss"],
})
export class OwlComponent implements OnInit {
  @Input() item: any;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit() {}

  onGetDetails(owl: any) {
    this.firebaseService.selectedOwl = Object.assign({}, owl);
  }
}
