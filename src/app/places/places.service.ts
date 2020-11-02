import { AuthService } from "./../auth/auth.service";
import { Place } from "./place.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay, find } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  constructor(private authService: AuthService) {}

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "The Amazing Koutoubia",
      "Beautiful Old mosque.",
      "https://bit.ly/3kLWcAL",
      0.0,
      new Date("2020-10-02"),
      new Date("2020-11-02"),
      "abc"
    ),
    new Place(
      "p2",
      "Jami al-Qarawiyyin",
      "The first university in the world.",
      "https://bit.ly/2HRRNgO",
      0.0,
      new Date("2020-10-02"),
      new Date("2020-11-02"),
      "id1"
    ),
    new Place(
      "p3",
      "Hassan II Mosque",
      "Biggest mosque in Africa.",
      "https://bit.ly/2TDaW90",
      0.0,
      new Date("2020-10-02"),
      new Date("2020-11-02"),
      "id1"
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this._places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://bit.ly/2HRRNgO",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
