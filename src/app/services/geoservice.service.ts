import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeoResults } from "./geomodel.service";
import { environment } from "../../environments/environment";
import { PagedResponse } from "./base-models.service";

@Injectable({
	providedIn: "root",
})
export class GeoserviceService {
	constructor(protected http: HttpClient) {}
	getUrl(url: string) {
		return environment.apiUrl + url;
	}

	getLocationGeoDetails(locationname: string): Observable<GeoResults> {
		let url = "https://api.opencagedata.com/geocode/v1/json";
		let api_key = environment.opencageAPI;

		let request_url =
			url +
			"?" +
			"key=" +
			api_key +
			"&q=" +
			encodeURIComponent(locationname) +
			"&pretty=1" +
			"&no_annotations=1";

		let params = new HttpParams()
			.set("key", environment.opencageAPI)
			.set("q", locationname);
		return this.http.get<GeoResults>(request_url, { params });
	}

	geocodeAddress(address: string): Observable<any> {
		// Replace YOUR_API_KEY with your actual Google API key
		const url = this.getUrl("api/Utils/GetMap");
		const params = new HttpParams().set("address", address);
		return this.http.get<any>(url, { params });
	}

	async geocode(address: string): Promise<google.maps.LatLngLiteral> {
		const response = await this.http
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					address,
				)}&key=${environment.keys.googleMaps}`,
			)
			.toPromise();

		const location = response["results"][0]["geometry"]["location"];
		return { lat: location.lat, lng: location.lng };
	}

	getGoogleMap(address: string): Observable<PagedResponse<any>> {
		let url = this.getUrl("api/OrderMessage");
		let params = new HttpParams().set("pageaddressNumber", address);
		return this.http.get<PagedResponse<any>>(url, { params });
	}
}
