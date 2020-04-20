import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemInterface } from '../types/item-interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  selectedItem: ItemInterface = new ItemInterface();

  constructor(
    private firebase: AngularFireDatabase,
    public db: AngularFirestore
  ) {}

  create(value: any) {
    return this.firebase.list('owls').push({
      id: value.id,
      image: value.image,
      person: value.person,
      date: value.date,
      location: value.location,
      category: value.category,
      comment: value.comment,
    } as ItemInterface);
  }

  getSelectedItem() {
    return this.selectedItem;
  }

  getList() {
    return this.firebase.list('owls', (ref) => ref.orderByChild('id'));
  }

  getItem(key: string) {
    return this.firebase.object('owls/' + key);
  }

  edit(item: ItemInterface) {
    return this.firebase.list('owls').update(item.key, item);
  }

  update(key: string, favourite: boolean) {
    return this.firebase.list('owls').update(key, { favourite });
  }

  delete(key: string) {
    return this.firebase.object('owls/' + key).remove();
  }
}
