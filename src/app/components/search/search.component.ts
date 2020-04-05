import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { OwlInterface } from "src/app/types/owl-interface";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  items: any;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getList().subscribe((result) => {
      this.items = result.map((c: any) => ({
        key: c.payload.key,
        ...c.payload.val(),
      }));
    });
  }
}
