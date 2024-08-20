import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BaseModelsService {}

export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  data: T[];
  message: string | null;
  succeeded: boolean;
  errors: string[] | null;
}
export interface ApiResponse<T> {
  data: T | null;
  succeeded: boolean;
  errors: string[] | null;
  message: string | null;
}

export interface Location {
  country: string;
  lat: number;
  lng: number;
  description: string;
  locations: Array<Locations>;
}

export interface Locations {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export interface MarkerEl {
  coordinate: Coordinate;
  markerId: string;
  title: string;
  snippet: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
