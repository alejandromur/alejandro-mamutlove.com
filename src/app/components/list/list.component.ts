import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { OwlInterface } from "src/app/types/owl-interface";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  items: any;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getOwls().subscribe(result => {
      this.items = result.map((c: any) => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }
}
