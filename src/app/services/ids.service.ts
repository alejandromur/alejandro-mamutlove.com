import { Injectable } from "@angular/core";
import { IdsInterface } from "../models/ids";

@Injectable({
  providedIn: "root",
})
export class IdsService {
  dictionary: any;

  constructor() {}

  getKey(id: number) {
    const n = Number(id);
    if (this.dictionary === undefined) {
      return;
    }
    return this.dictionary.filter((item: IdsInterface) => item.id === n);
  }

  save(dictionary: any): void {
    this.dictionary = dictionary;
    console.log(this.dictionary);
  }
}
