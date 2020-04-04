import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { Subscription, Observable } from "rxjs";
import { IdsService } from "src/app/services/ids.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  owl: any;

  constructor(
    private route: ActivatedRoute,
    public firebaseService: FirebaseService,
    public idsService: IdsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      const dict = this.idsService.getKey(id);
      this.firebaseService
        .getOwl(dict[0].key)
        .valueChanges()
        .subscribe((data) => {
          console.log(data);

          this.owl = data;
        });
    });
  }
}
