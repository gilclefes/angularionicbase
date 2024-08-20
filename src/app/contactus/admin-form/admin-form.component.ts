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
import { ContactUsDto } from "../../services/admin-models.service";
import { AuthService } from "../../auth/auth.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { Appheader } from "../../components/header/appheader.component";
import { PipesModule } from "../../pipes/pipes.module";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-admin-form",
  templateUrl: "./admin-form.component.html",
  styleUrls: ["./admin-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Appheader,
    PipesModule,
  ],
  providers: [ToastComponent],
})
export class AdminContactUsFormComponent implements OnInit {
  createContactUsForm: UntypedFormGroup;
  ContactUsList: ContactUsDto[] = [];
  origContactUsList: ContactUsDto[] = [];
  selectedContactUs: ContactUsDto;

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

    this.getContactUss();
  }

  //a function to seach country by name from countryList
  searchContactUss(event: any) {
    let searchValue = event;

    if (searchValue && searchValue.trim() != "") {
      this.ContactUsList = this.ContactUsList.filter((ContactUs) => {
        return ContactUs.name
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    } else {
      this.ContactUsList = this.origContactUsList;
    }
  }

  ngOnInit() {
    this.createContactUsForm = new UntypedFormGroup({
      name: new UntypedFormControl("", Validators.required),
      email: new UntypedFormControl("", Validators.required),

      message: new UntypedFormControl(true),
    });

    this.searchForm
      .get("searchControl")
      .valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((subreddit: any) => {
        this.searchContactUss(subreddit);
      });
  }

  async cancelModal() {
    if (this.isPopOver) {
      this.popoverCtrl.dismiss({});
    } else {
      await this.modalController.dismiss(null);
    }
  }

  updateContactUs() {
    if (this.selectedContactUs == null) {
      //this.postContactUs();
    } else {
      this.editContactUs();
    }
  }

  editContactUs() {
    let ContactUsDto: ContactUsDto = {
      name: this.createContactUsForm.controls["name"].value,
      email: this.createContactUsForm.controls["email"].value,

      message: this.createContactUsForm.controls["message"].value,
      id: this.selectedContactUs.id,
      read: this.selectedContactUs.read,
      readAt: new Date(),
    };

    this.adminService.putContactUs(ContactUsDto).subscribe({
      next: (result) => {
        this.selectedContactUs = null;
        this.isEditMode = false;

        this.updateContactUsList(ContactUsDto);
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  updateContactUsList(ContactUs: ContactUsDto) {
    let index = this.ContactUsList.findIndex((c) => c.id == ContactUs.id);
    this.ContactUsList[index] = ContactUs;
  }

  addContactUsToList(ContactUs: ContactUsDto) {
    this.ContactUsList.push(ContactUs);
  }

  getContactUss() {
    this.adminService.getContactUsAll(1, 500).subscribe({
      next: (result) => {
       
        this.ContactUsList = result.data;
        this.origContactUsList = result.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  editContactUsForm(ContactUs: ContactUsDto) {
    this.selectedContactUs = ContactUs;
    this.isEditMode = true;
    this.populateForm();
  }

  populateForm() {
    this.createContactUsForm.controls["name"].setValue(
      this.selectedContactUs.name
    );
    this.createContactUsForm.controls["email"].setValue(
      this.selectedContactUs.email
    );

    this.createContactUsForm.controls["message"].setValue(
      this.selectedContactUs.message
    );
  }

  cancelForm() {
    this.isEditMode = false;
  }

  newRecord() {
    this.isEditMode = true;
    this.selectedContactUs = null;
    this.createContactUsForm.reset();
  }
}
