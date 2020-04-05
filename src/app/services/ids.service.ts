import { Injectable } from "@angular/core";
import { IdsInterface } from "../models/ids";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class IdsService {
  dictionary: any;

  constructor(private router: Router) {}

  getKey(id: number) {
    const stringAsNumber = Number(id);
    if (this.dictionary === undefined) {
      this.router.navigate(["/listado"]);
      return;
    }
    return this.dictionary.filter(
      (item: IdsInterface) => item.id === stringAsNumber
    );
  }

  getLastIndex() {
    if (this.dictionary === undefined) {
      this.router.navigate(["/listado"]);
      return;
    }
    return this.dictionary[this.dictionary.length - 1].id + 1;
  }

  save(dictionary: any): void {
    this.dictionary = dictionary;
    console.log(this.dictionary);
  }
}
