import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { IdsService } from "src/app/services/ids.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  items: any;
  dictionary: { key: string; id: number }[];

  constructor(
    public firebaseService: FirebaseService,
    public idsService: IdsService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.firebaseService
      .getList()
      .snapshotChanges()
      .subscribe((result) => {
        this.items = result.reverse().map((c: any) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  onGetDetails(owl: any) {
    this.firebaseService.selectedOwl = Object.assign({}, owl);
  }
}
