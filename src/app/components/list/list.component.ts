import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  noResults = false;

  rawItems: any = [];
  items: any = [];

  dictionary: { key: string; id: number }[];

  constructor(
    public firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.firebaseService
      .getList()
      .snapshotChanges()
      .subscribe((result) => {
        this.rawItems = result.reverse().map((c: any) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
        this.items = [...this.rawItems];
      });
  }

  onSearch(search: string[]) {
    const [channel, query] = [...search];

    this.items = this.rawItems.filter((item) => {
      if (channel === "id") {
        let channelId = item.id;
        channelId = channelId.toString();
        return channelId.includes(query);
      }
      return item[channel].includes(query);
    });

    if (!this.items.length) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }
}
