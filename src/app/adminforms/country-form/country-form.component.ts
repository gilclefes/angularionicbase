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
import { ToastComponent } from "../../components/toastComponent";
import { CountryDto } from "../../services/admin-models.service";
import { AuthService } from "../../auth/auth.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-country-form",
  templateUrl: "./country-form.component.html",
  styleUrls: ["./country-form.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  providers: [ToastComponent],
})
export class CountryFormComponent implements OnInit {
  createCountryForm: UntypedFormGroup;
  CountryList: CountryDto[] = [];
  origCountryList: CountryDto[] = [];
  selectedCountry: CountryDto;

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

    this.getCountrys();
  }

  //a function to seach country by name from countryList
  searchCountrys(event: any) {
    let searchValue = event;

    if (searchValue && searchValue.trim() != "") {
      this.CountryList = this.CountryList.filter((Country) => {
        return Country.name
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    } else {
      this.CountryList = this.origCountryList;
    }
  }

  ngOnInit() {
    this.createCountryForm = new UntypedFormGroup({
      name: new UntypedFormControl("", Validators.required),
      code: new UntypedFormControl("", Validators.required),

      status: new UntypedFormControl(true),
    });

    this.searchForm
      .get("searchControl")
      .valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((subreddit: any) => {
        this.searchCountrys(subreddit);
      });
  }

  validations = {
    name: [{ type: "required", message: "Id Type Name is required." }],
    code: [{ type: "required", message: "Id Type Code is required." }],
  };

  async cancelModal() {
    if (this.isPopOver) {
      this.popoverCtrl.dismiss({});
    } else {
      await this.modalController.dismiss(null);
    }
  }

  updateCountry() {
    if (this.selectedCountry == null) {
      this.postCountry();
    } else {
      this.editCountry();
    }
  }

  postCountry() {
    let CountryDto: CountryDto = {
      name: this.createCountryForm.controls["name"].value,
      code: this.createCountryForm.controls["code"].value,
      status: this.createCountryForm.controls["status"].value,
      id: 0,
    };

    this.adminService.postCountry(CountryDto).subscribe({
      next: (result) => {
       
        this.isEditMode = false;
        this.selectedCountry = null;
        CountryDto.id = result.id;
        this.addCountryToList(CountryDto);
        //this.closeModal();
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
       
      },
    });
  }

  editCountry() {
    let CountryDto: CountryDto = {
      name: this.createCountryForm.controls["name"].value,
      code: this.createCountryForm.controls["code"].value,

      status: this.createCountryForm.controls["status"].value,
      id: this.selectedCountry.id,
    };

    this.adminService.putCountry(CountryDto).subscribe({
      next: (result) => {
        this.selectedCountry = null;
        this.isEditMode = false;

        this.updateCountryList(CountryDto);
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
        
      },
    });
  }

  updateCountryList(Country: CountryDto) {
    let index = this.CountryList.findIndex((c) => c.id == Country.id);
    this.CountryList[index] = Country;
  }

  addCountryToList(Country: CountryDto) {
    this.CountryList.push(Country);
  }

  getCountrys() {
    this.adminService.getCountries(1, 500).subscribe({
      next: (result) => {
        
        this.CountryList = result.data;
        this.origCountryList = result.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  editCountryForm(Country: CountryDto) {
    this.selectedCountry = Country;
    this.isEditMode = true;
    this.populateForm();
  }

  populateForm() {
    this.createCountryForm.controls["name"].setValue(this.selectedCountry.name);
    this.createCountryForm.controls["code"].setValue(this.selectedCountry.code);

    this.createCountryForm.controls["status"].setValue(
      this.selectedCountry.status
    );
  }

  cancelForm() {
    this.isEditMode = false;
  }

  newRecord() {
    this.isEditMode = true;
    this.selectedCountry = null;
    this.createCountryForm.reset();
  }
}
