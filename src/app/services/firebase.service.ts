import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { OwlInterface } from "../types/owl-interface";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  owlsList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    public db: AngularFirestore
  ) {}

  getOwls() {
    return this.firebase.list("owls").snapshotChanges();
  }

  createOwl(value: any) {
    return this.firebase.list("owls").push({
      id: value.id,
      person: value.person,
      date: value.date,
      location: value.location,
      category: value.category,
      comment: value.comment
    } as OwlInterface);
  }
}
