import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { OwlInterface } from "../types/owl-interface";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  owlsList: AngularFireList<any>;
  selectedOwl: OwlInterface = new OwlInterface();

  constructor(
    private firebase: AngularFireDatabase,
    public db: AngularFirestore
  ) {}

  create(value: any) {
    return this.firebase.list("owls").push({
      id: value.id,
      image: value.image,
      person: value.person,
      date: value.date,
      location: value.location,
      category: value.category,
      comment: value.comment,
    } as OwlInterface);
  }

  getSelectedOwl() {
    return this.selectedOwl;
  }

  getList() {
    return this.firebase.list("owls", (ref) => ref.orderByChild("id"));
  }

  getItem(key: string) {
    return this.firebase.object("owls/" + key);
  }

  edit(item: OwlInterface) {
    return this.firebase.list("owls").update(item.key, item);
  }

  delete(key: string) {
    return this.firebase.object("owls/" + key).remove();
  }
}
