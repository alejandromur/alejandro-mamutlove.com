import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { IdsService } from "src/app/services/ids.service";
import { IdsInterface } from "src/app/models/ids";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  owl: any;
  dict: IdsInterface;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public firebaseService: FirebaseService,
    public idsService: IdsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      this.dict = this.idsService.getKey(id);
      this.firebaseService
        .getItem(this.dict[0].key)
        .valueChanges()
        .subscribe((data) => {
          console.log(data);
          this.owl = data;
        });
    });
  }

  edit(key: string) {}

  delete(key: string) {
    this.firebaseService.delete(this.dict[0].key);
    this.router.navigate(["/listado"]);
  }
}
