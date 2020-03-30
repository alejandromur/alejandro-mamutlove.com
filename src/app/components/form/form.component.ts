import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(1, Validators.required),
      person: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      comment: new FormControl("", Validators.required)
    });
  }

  onSubmit(event: any) {
    console.warn(this.form.value);
    this.firebaseService.createOwl(this.form.value).then(res => {
      // this.resetFields();
      this.router.navigate(["/listado"]);
    });
  }
}
