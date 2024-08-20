import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  IonicModule,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { NgSelectModule } from "@ng-select/ng-select";
import { AuthService } from "../../auth/auth.service";
import { ComponentsModule } from "../../components/components.module";
import { ToastComponent } from "../../components/toastComponent";
import { CityDto, CountryDto } from "../../services/admin-models.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { PagedResponse } from "../../services/base-models.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-city-form",
  templateUrl: "./city-form.component.html",
  styleUrls: ["./city-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgSelectModule,
    ComponentsModule,
  ],
  providers: [ToastComponent],
})
export class CityFormComponent implements OnInit {
  createCityForm: UntypedFormGroup;
  countryResult: PagedResponse<CountryDto>;
  selectedCountry: CountryDto;
  countryList: CountryDto[] = [];
  cityList: CityDto[] = [];
  origCityList: CityDto[] = [];
  selectedCity: CityDto;
  isEditMode: boolean = false;

  @Input()
  public isPopOver = false;

  searching: any = false;
  searchTerm: string = "";
  searchControl: UntypedFormControl;
  public searchForm: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private adminService: AdminServiceService,
    private modalController: ModalController,
    private popoverCtrl: PopoverController,
    private toast: ToastComponent
  ) {
    this.searchForm = new UntypedFormGroup({
      searchControl: new UntypedFormControl(""),
    });
    this.getCountries();
    this.getCities();
  }

  //a function to seach country by name from countryList
  searchCities(event: any) {
    let searchValue = event;

    if (searchValue && searchValue.trim() != "") {
      this.cityList = this.cityList.filter((city) => {
        return city.name
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    } else {
      this.cityList = this.origCityList;
    }
  }

  ngOnInit() {
    this.createCityForm = new UntypedFormGroup({
      name: new UntypedFormControl("", Validators.required),
      code: new UntypedFormControl("", Validators.required),
      countryId: new UntypedFormControl("", Validators.required),
      status: new UntypedFormControl(true),
    });

    this.searchForm
      .get("searchControl")
      .valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((subreddit: any) => {
        this.searchCities(subreddit);
      });
  }

  validations = {
    name: [{ type: "required", message: "City Name is required." }],
    code: [{ type: "required", message: "City Code is required." }],
    countryId: [{ type: "required", message: "Country is required." }],
  };

  getCountries() {
    this.adminService.getCountries(1, 500).subscribe({
      next: (result) => {
     
        this.countryResult = result;
        this.countryList = this.countryResult.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  async cancelModal() {
    if (this.isPopOver) {
      this.popoverCtrl.dismiss({});
    } else {
      await this.modalController.dismiss(null);
    }
  }

  updateCity() {
    if (this.selectedCity == null) {
      this.postCity();
    } else {
      this.editCity();
    }
  }

  postCity() {
    
    let cityDto: CityDto = {
      name: this.createCityForm.controls["name"].value,
      code: this.createCityForm.controls["code"].value,
      countryId: this.createCityForm.controls["countryId"].value,
      status: this.createCityForm.controls["status"].value,
    };

    this.adminService.postCity(cityDto).subscribe({
      next: (result) => {
        
        this.isEditMode = false;
        this.selectedCity = null;
        cityDto.id = result.id;
        this.addCityToList(cityDto);
        //this.closeModal();
        this.toast.presentSuccess();
        this.createCityForm.reset();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
       
      },
    });
  }

  //function to edit city
  editCity() {
    
    let cityDto: CityDto = {
      name: this.createCityForm.controls["name"].value,
      code: this.createCityForm.controls["code"].value,
      countryId: this.createCityForm.controls["countryId"].value,
      status: this.createCityForm.controls["status"].value,
      id: this.selectedCity.id,
    };

    this.adminService.putCity(cityDto).subscribe({
      next: (result) => {
        this.selectedCity = null;
        this.isEditMode = false;
       
        //this.closeModal();
        this.updateCityList(cityDto);
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      
      },
    });
  }

  //a function to update the content on the cityList array after editing
  updateCityList(city: CityDto) {
    city.countryName = this.getCountryName(city.countryId);
    let index = this.cityList.findIndex((c) => c.id == city.id);
    this.cityList[index] = city;
  }

  //function to add citydto to the cityList array after adding
  addCityToList(city: CityDto) {
    city.countryName = this.getCountryName(city.countryId);
    this.cityList.push(city);
  }

  // a function to get country name from the countryList array using the id
  getCountryName(id: number) {
    let country = this.countryList.find((c) => c.id == id);
    return country.name;
  }

  //function to get a list of cities using the getcity endpoint
  getCities() {
    this.adminService.getCities(1, 500).subscribe({
      next: (result) => {
       
        this.cityList = result.data;
        this.origCityList = result.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  editCityForm(city: CityDto) {
    this.selectedCity = city;
    this.isEditMode = true;
    this.populateForm();
  }

  //funtion to pupulate the form with the selected city
  populateForm() {
    this.createCityForm.controls["name"].setValue(this.selectedCity.name);
    this.createCityForm.controls["code"].setValue(this.selectedCity.code);
    this.createCityForm.controls["countryId"].setValue(this.selectedCity.countryId);
    this.createCityForm.controls["status"].setValue(this.selectedCity.status);

    this.createCityForm.patchValue({
      countryId: this.selectedCity.countryId,
    });
  }

  cancelForm() {
    this.isEditMode = false;
  }

  newRecord() {
    this.isEditMode = true;
    this.selectedCity = null;
    this.createCityForm.reset();
  }
}
