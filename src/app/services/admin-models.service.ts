import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminModelsService {}

export interface CityDto {
  id?: number;
  name: string;
  code: string;
  status: boolean;
  countryId: number;
  countryName?: string;
}

//If I copy pass c# class eydtxport it to typescript interface

export interface CountryDto {
  id: number;
  name: string;
  code: string;
  status: boolean;
}

export interface FaqDto {
  id: number;
  question: string;
  answer: string;
  status: boolean;
  rank: number;
}

export interface IdTypeDto {
  id: number;
  name: string;
  code?: string;
  status: boolean;
}

export interface ContactUsDto {
  id: number;
  name: string | null;
  email: string | null;
  message: string;
  read: boolean;
  readBy?: string | null;
  readAt?: Date | null;
  createdAt?: Date | null;
}

export interface RegisterDto {
  Name: string;
  Email: string;
  Password: string;
}

export interface ResetPasswordDto {
  Token: string;
  Email: string;
  NewPassword: string;
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}

export interface ApplicationUserDto {
  id: string;
  userName: string;
  normalizedUserName?: string;
  email: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  roles: string[];
}

export interface UserRoles {
  id: string;
  name: string;
  normalizedName: string;
}

export interface RolesToUpdateDto {
  email: string;
  roles: string[];
}

export interface UserDeviceTokenDto {
  email: string;
  deviceToken: string;
}

export enum AmountTypeEnum {
  FIXED = "Fixed",
  PERCENTAGE = "Percentage",
}
