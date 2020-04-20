import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  noResults = false;
  rawItems: any = [];
  items: any = [];

  constructor(public firebaseService: FirebaseService) {}

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
        })).filter((c: any) => c.favourite);
        this.items = [...this.rawItems];
      });
  }
}
