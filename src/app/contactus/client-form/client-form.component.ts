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
import { Appheader } from "../../components/header/appheader.component";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Appheader,
  ],
  providers: [ToastComponent],
})
export class ContactUsFormComponent implements OnInit {
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
  }

  ngOnInit() {
    this.createContactUsForm = new UntypedFormGroup({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      name: new UntypedFormControl("", Validators.required),

      message: new UntypedFormControl("", Validators.required),
    });
  }

  validations = {
    email: [{ type: "required", message: "Email is required." }],
    name: [{ type: "required", message: "Name is required." }],
    message: [{ type: "required", message: "Message is required." }],
  };

  async cancelModal() {
    if (this.isPopOver) {
      this.popoverCtrl.dismiss({});
    } else {
      await this.modalController.dismiss(null);
    }
  }

  updateContactUs() {
    if (this.selectedContactUs == null) {
      this.postContactUs();
    }
  }

  postContactUs() {
    let ContactUsDto: ContactUsDto = {
      email: this.createContactUsForm.controls["email"].value,
      name: this.createContactUsForm.controls["name"].value,
      message: this.createContactUsForm.controls["message"].value,
      id: 0,
      read: false,
    };

    this.adminService.postContactUs(ContactUsDto).subscribe({
      next: (result) => {
        this.isEditMode = false;
        this.selectedContactUs = null;
        ContactUsDto.id = result.id;

        this.toast.presentSuccess();
        this.createContactUsForm.reset();
      },
      error: (error) => {},
    });
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
