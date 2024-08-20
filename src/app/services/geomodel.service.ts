import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GeomodelService {
  constructor() {}
}

export interface GeoStatus {
  code: number;
  message: string;
}

export interface GeoGeometry {
  lat: number;
  lng: number;
}

export interface GeoResult {
  geometry: GeoGeometry;
  confidence: number;
}

export interface GeoResults {
  results: GeoResult[];
  status: GeoStatus;
}
