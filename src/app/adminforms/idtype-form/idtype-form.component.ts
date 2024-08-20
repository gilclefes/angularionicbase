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
import { IdTypeDto } from "../../services/admin-models.service";
import { AuthService } from "../../auth/auth.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-idtype-form",
  templateUrl: "./idtype-form.component.html",
  styleUrls: ["./idtype-form.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  providers: [ToastComponent],
})
export class IdtypeFormComponent implements OnInit {
  createIdTypeForm: UntypedFormGroup;
  idTypeList: IdTypeDto[] = [];
  origidTypeList: IdTypeDto[] = [];
  selectedIdType: IdTypeDto;

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

    this.getIdTypes();
  }

  //a function to seach country by name from countryList
  searchIdTypes(event: any) {
    let searchValue = event;

    if (searchValue && searchValue.trim() != "") {
      this.idTypeList = this.idTypeList.filter((idType) => {
        return idType.name
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    } else {
      this.idTypeList = this.origidTypeList;
    }
  }

  ngOnInit() {
    this.createIdTypeForm = new UntypedFormGroup({
      name: new UntypedFormControl("", Validators.required),
      code: new UntypedFormControl("", Validators.required),

      status: new UntypedFormControl(true),
    });

    this.searchForm
      .get("searchControl")
      .valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((subreddit: any) => {
        this.searchIdTypes(subreddit);
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

  updateIdType() {
    if (this.selectedIdType == null) {
      this.postIdType();
    } else {
      this.editIdType();
    }
  }

  postIdType() {
    let idtypeDto: IdTypeDto = {
      name: this.createIdTypeForm.controls["name"].value,
      code: this.createIdTypeForm.controls["code"].value,
      status: this.createIdTypeForm.controls["status"].value,
      id: 0,
    };

    this.adminService.postIdType(idtypeDto).subscribe({
      next: (result) => {
        this.isEditMode = false;
        this.selectedIdType = null;
        idtypeDto.id = result.id;
        this.addIdTypeToList(idtypeDto);
        //this.closeModal();
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  editIdType() {
    let idTypeDto: IdTypeDto = {
      name: this.createIdTypeForm.controls["name"].value,
      code: this.createIdTypeForm.controls["code"].value,

      status: this.createIdTypeForm.controls["status"].value,
      id: this.selectedIdType.id,
    };

    this.adminService.putIdType(idTypeDto).subscribe({
      next: (result) => {
        this.selectedIdType = null;
        this.isEditMode = false;

        this.updateIdTypeList(idTypeDto);
        this.toast.presentSuccess();
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
       
      },
    });
  }

  updateIdTypeList(idtype: IdTypeDto) {
    let index = this.idTypeList.findIndex((c) => c.id == idtype.id);
    this.idTypeList[index] = idtype;
  }

  addIdTypeToList(idtype: IdTypeDto) {
    this.idTypeList.push(idtype);
  }

  getIdTypes() {
    this.adminService.getIdTypes(1, 500).subscribe({
      next: (result) => {
      
        this.idTypeList = result.data;
        this.origidTypeList = result.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  editIdTypeForm(idType: IdTypeDto) {
    this.selectedIdType = idType;
    this.isEditMode = true;
    this.populateForm();
  }

  populateForm() {
    this.createIdTypeForm.controls["name"].setValue(this.selectedIdType.name);
    this.createIdTypeForm.controls["code"].setValue(this.selectedIdType.code);

    this.createIdTypeForm.controls["status"].setValue(
      this.selectedIdType.status
    );
  }

  cancelForm() {
    this.isEditMode = false;
  }

  newRecord() {
    this.isEditMode = true;
    this.selectedIdType = null;
    this.createIdTypeForm.reset();
  }
}
