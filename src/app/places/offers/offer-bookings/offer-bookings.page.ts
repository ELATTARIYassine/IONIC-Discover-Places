import { PlacesService } from "./../../places.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Place } from "../../place.model";

@Component({
  selector: "app-offer-bookings",
  templateUrl: "./offer-bookings.page.html",
  styleUrls: ["./offer-bookings.page.scss"],
})
export class OfferBookingsPage implements OnInit {
  place: Place;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get("placeId"));
    });
  }
  fixNavigation() {
    this.navCtrl.navigateBack("/places/tabs/discover");
  }
}
