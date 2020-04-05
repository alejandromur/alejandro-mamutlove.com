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
    this.firebaseService.getList().subscribe((result) => {
      this.items = result.map((c: any) => ({
        key: c.payload.key,
        ...c.payload.val(),
      }));
      this.saveDictionary(this.items);
    });
  }

  saveDictionary(obj: any): void {
    console.log(obj);
    this.dictionary = obj.map((item) => {
      console.log(item);
      return { key: item.key, id: item.id };
    });
    console.log(this.dictionary);
    this.idsService.save(this.dictionary);
  }
}
