import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";
import { IdsService } from "src/app/services/ids.service";
import { ActivatedRoute } from "@angular/router";
import { IdsInterface } from "src/app/models/ids";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  form: FormGroup;

  action: string;

  owl: any;
  key: string;
  dict: IdsInterface;

  constructor(
    private route: ActivatedRoute,
    public firebaseService: FirebaseService,
    public idsService: IdsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.initForm(data);
      this.action = data.action;
    });
  }

  initForm(data: any): void {
    console.log(this.firebaseService.getSelectedOwl());
    console.log(this.firebaseService.selectedOwl);
    if (data.action === "edit") {
      console.log("edit");
      this.form = new FormGroup({
        key: new FormControl(this.firebaseService.selectedOwl.key),
        id: new FormControl(
          this.firebaseService.selectedOwl.id,
          Validators.required
        ),
        person: new FormControl(
          this.firebaseService.selectedOwl.person,
          Validators.required
        ),
        date: new FormControl(
          this.firebaseService.selectedOwl.date,
          Validators.required
        ),
        location: new FormControl(
          this.firebaseService.selectedOwl.location,
          Validators.required
        ),
        category: new FormControl(
          this.firebaseService.selectedOwl.category,
          Validators.required
        ),
        comment: new FormControl(
          this.firebaseService.selectedOwl.comment,
          Validators.required
        ),
      });
    } else if (data.action === "new") {
      const idx = this.idsService.getLastIndex();
      this.form = new FormGroup({
        key: new FormControl(null),
        id: new FormControl(idx, Validators.required),
        person: new FormControl("", Validators.required),
        date: new FormControl("", Validators.required),
        location: new FormControl("", Validators.required),
        category: new FormControl("", Validators.required),
        comment: new FormControl("", Validators.required),
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.initForm({ action: "new" });
  }

  onSubmit(event: any) {
    console.warn(this.form.value);
    if (this.action === "edit") {
      this.firebaseService.edit(this.form.value).then((res) => {
        this.resetForm();
      });
    } else if (this.action === "new") {
      this.firebaseService.create(this.form.value).then((res) => {
        this.resetForm();
      });
    }
  }
}
