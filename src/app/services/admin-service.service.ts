import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, PagedResponse } from "./base-models.service";
import {
  ApplicationUserDto,
  CityDto,
  ConfirmEmailRequest,
  ContactUsDto,
  CountryDto,
  FaqDto,
  IdTypeDto,
  RegisterDto,
  ResetPasswordDto,
  RolesToUpdateDto,
  UserDeviceTokenDto,
  UserRoles,
} from "./admin-models.service";

@Injectable({
  providedIn: "root",
})
export class AdminServiceService {
  constructor(protected http: HttpClient) {}

  getUrl(url: string) {
    return environment.apiUrl + url;
  }

  getCities(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<CityDto>> {
    let url = this.getUrl("api/City");
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<PagedResponse<CityDto>>(url, { params });
  }

  getCitiesByCountryId(
    countryId: number,
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<CityDto>> {
    let url = this.getUrl("api/City/countryId/" + countryId);
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<PagedResponse<CityDto>>(url, { params });
  }

  getCity(id: number): Observable<ApiResponse<CityDto>> {
    let url = this.getUrl("api/City/" + id);
    return this.http.get<ApiResponse<CityDto>>(url);
  }

  putCity(item: CityDto): Observable<CityDto> {
    let url = this.getUrl("api/City/" + item.id);
    return this.http.put<CityDto>(url, item);
  }

  postCity(item: CityDto): Observable<CityDto> {
    let url = this.getUrl("api/City");
    return this.http.post<CityDto>(url, item);
  }

  getCountries(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<CountryDto>> {
    let url = this.getUrl("api/Country");
    let params = new HttpParams()
      .set("PageNumber", pageNumber.toString())
      .set("PageSize", pageSize.toString());

    return this.http.get<PagedResponse<CountryDto>>(url, { params });
  }

  getCountry(id: number): Observable<ApiResponse<CountryDto>> {
    let url = this.getUrl("api/Country/" + id);
    return this.http.get<ApiResponse<CountryDto>>(url);
  }

  putCountry(item: CountryDto): Observable<CountryDto> {
    let url = this.getUrl("api/Country/" + item.id);
    return this.http.put<CountryDto>(url, item);
  }

  postCountry(item: CountryDto): Observable<CountryDto> {
    let url = this.getUrl("api/Country");
    return this.http.post<CountryDto>(url, item);
  }

  getIdTypes(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<IdTypeDto>> {
    let url = this.getUrl("api/IdType");
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<PagedResponse<IdTypeDto>>(url, { params });
  }

  getIdType(id: number): Observable<ApiResponse<IdTypeDto>> {
    let url = this.getUrl("api/IdType/" + id);
    return this.http.get<ApiResponse<IdTypeDto>>(url);
  }

  putIdType(item: IdTypeDto): Observable<IdTypeDto> {
    let url = this.getUrl("api/IdType/" + item.id);
    return this.http.put<IdTypeDto>(url, item);
  }

  postIdType(item: IdTypeDto): Observable<IdTypeDto> {
    let url = this.getUrl("api/IdType");
    return this.http.post<IdTypeDto>(url, item);
  }

  //Faqs
  getFaqs(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<FaqDto>> {
    let url = this.getUrl("api/Faq");
    let params = new HttpParams()
      .set("PageNumber", pageNumber.toString())
      .set("PageSize", pageSize.toString());

    return this.http.get<PagedResponse<FaqDto>>(url, { params });
  }

  getFaqsActive(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<FaqDto>> {
    let url = this.getUrl("api/Faq/Active");
    let params = new HttpParams()
      .set("PageNumber", pageNumber.toString())
      .set("PageSize", pageSize.toString());

    return this.http.get<PagedResponse<FaqDto>>(url, { params });
  }

  getFaq(id: number): Observable<ApiResponse<FaqDto>> {
    let url = this.getUrl("api/Faq/" + id);
    return this.http.get<ApiResponse<FaqDto>>(url);
  }

  putFaq(item: FaqDto): Observable<FaqDto> {
    let url = this.getUrl("api/Faq/" + item.id);
    return this.http.put<FaqDto>(url, item);
  }

  postFaq(item: FaqDto): Observable<FaqDto> {
    let url = this.getUrl("api/Faq");
    return this.http.post<FaqDto>(url, item);
  }

  getImageURL(fileName: string): string {
    let url = this.getUrl("api/Utils/GetImage/" + fileName);
    return url;
  }

  //add methods for ContactUsDto
  getContactUsAll(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<ContactUsDto>> {
    const url = this.getUrl("api/ContactUs");
    const params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<PagedResponse<ContactUsDto>>(url, { params });
  }

  getContactUs(id: number): Observable<ApiResponse<ContactUsDto>> {
    let url = this.getUrl("api/ContactUs/" + id);
    return this.http.get<ApiResponse<ContactUsDto>>(url);
  }

  putContactUs(item: ContactUsDto): Observable<ContactUsDto> {
    let url = this.getUrl("api/ContactUs/" + item.id);
    return this.http.put<ContactUsDto>(url, item);
  }

  postContactUs(item: ContactUsDto): Observable<ContactUsDto> {
    let url = this.getUrl("api/ContactUs");
    return this.http.post<ContactUsDto>(url, item);
  }

  getImage(fileName: string): Observable<any> {
    let url = this.getUrl("api/Utils/GetImage/" + fileName);

    let headers = new HttpHeaders();
    headers = headers.set("responseType", "image/jpeg");
    return this.http.get<any>(url, { headers: headers });
  }

  //register user

  registerUser(item: RegisterDto): Observable<any> {
    let url = this.getUrl("api/auth/register");
    return this.http.post<any>(url, item);
  }

  forgotPassword(email: string): Observable<any> {
    let url = this.getUrl("api/auth/forgotpassword?email=" + email);
    return this.http.post<any>(url, {});
  }

  resendConfirmationEmail(email: string): Observable<any> {
    let url = this.getUrl("api/Auth/resendconfirmationemail?email=" + email);
    return this.http.post<any>(url, {});
  }

  resetPassword(item: ResetPasswordDto): Observable<any> {
    let url = this.getUrl("api/auth/ResetPassword");
    return this.http.post<any>(url, item);
  }

  confirmEmail(item: ConfirmEmailRequest): Observable<any> {
    let url = this.getUrl("api/auth/confirmemail");
    return this.http.post<any>(url, item);
  }

  //get all users
  getUsers(
    pageNumber: number,
    pageSize: number
  ): Observable<PagedResponse<ApplicationUserDto>> {
    let url = this.getUrl("api/Auth/GetAllUsers");
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<any>(url, { params });
  }

  //roles functions
  getRoles(): Observable<UserRoles[]> {
    let url = this.getUrl("api/Auth/GetAllRoles");
    return this.http.get<any>(url);
  }

  //update use roles using updateuserrolesdto
  updateUserRoles(item: RolesToUpdateDto): Observable<any> {
    let url = this.getUrl("api/Auth/UpdateRole");
    return this.http.post<any>(url, item);
  }

  //userdevice token
  postUserDeviceToken(item: UserDeviceTokenDto): Observable<any> {
    let url = this.getUrl("api/DeviceToken/devicetoken");
    return this.http.post<any>(url, item);
  }
}
