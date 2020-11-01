import { Place } from "./place.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "The Amazing Koutoubia",
      "Beautiful Old mosque.",
      "https://bit.ly/3kLWcAL",
      0.0
    ),
    new Place(
      "p2",
      "Jami al-Qarawiyyin",
      "The first university in the world.",
      "https://bit.ly/2HRRNgO",
      0.0
    ),
    new Place(
      "p3",
      "Hassan II Mosque",
      "Biggest mosque in Africa.",
      "https://bit.ly/2TDaW90",
      0.0
    ),
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
