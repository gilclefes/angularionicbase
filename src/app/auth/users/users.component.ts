import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import {
  IonicModule,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { NgSelectModule } from "@ng-select/ng-select";
import { Appheader } from "../../components/header/appheader.component";
import { ToastComponent } from "../../components/toastComponent";
import {
  ApplicationUserDto,
  RolesToUpdateDto,
  UserRoles,
} from "../../services/admin-models.service";
import { AuthService } from "../auth.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
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
export class UsersComponent implements OnInit {
  usersList: ApplicationUserDto[] = [];
  origUserList: ApplicationUserDto[] = [];
  selectedUser: ApplicationUserDto;
  allRoles: UserRoles[] = [];
  allCurrentRoles: string[] = [];
  selectedUserRoles: string[] = [];

  origUserRoles: string[] = [];

  rolesToDelete: string[] = [];
  rolesToAdd: string[] = [];

  roleCount: number = 0;

  isEditMode: boolean = false;

  searching: any = false;
  searchTerm: string = "";
  searchControl: UntypedFormControl;
  public searchForm: UntypedFormGroup;

  formValid: boolean = false;

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
    this.getUsers();
    this.getRoles();
    this.searchForm
      .get("searchControl")
      .valueChanges.pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((subreddit: any) => {
        this.searchUsers(subreddit);
      });
  }

  searchUsers(event: any) {
    let searchValue = event;

    if (searchValue && searchValue.trim() != "") {
      this.usersList = this.usersList.filter((period) => {
        return period.userName
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    } else {
      this.usersList = this.origUserList;
    }
  }

  getUsers() {
    this.adminService.getUsers(1, 500).subscribe({
      next: (result) => {
        this.usersList = result.data;
        this.origUserList = result.data;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe({
      next: (result) => {
        this.allRoles = result;
        this.allCurrentRoles = this.allRoles.map((x) => x.name);
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  //get selected user roles
  getUserRoles(user: ApplicationUserDto) {
    this.selectedUser = user;
    this.selectedUserRoles = user.roles;
    this.roleCount = user.roles.length;
    this.origUserRoles = user.roles;
    this.isEditMode = true;
  }

  onCheckboxChange(option: string): void {
    const index = this.selectedUserRoles.indexOf(option);

    if (index === -1) {
      this.selectedUserRoles.push(option);
      this.roleCount++;

      const deleteIndex = this.rolesToDelete.indexOf(option);
      if (deleteIndex) {
        this.rolesToDelete.splice(deleteIndex, 1);
      }
    } else {
      this.selectedUserRoles.splice(index, 1);
      this.roleCount--;
      this.rolesToDelete.push(option);
    }

    this.formValid = this.roleCount > 0;
  }

  //function to add roles to user

  updateUserRoles() {
 

    let rolesToUpdate: RolesToUpdateDto = {
      email: this.selectedUser.email,
      roles: this.selectedUserRoles,
    };

    this.adminService.updateUserRoles(rolesToUpdate).subscribe({
      next: (result) => {
        this.toast.presentSuccess();
        this.getUsers();
        this.isEditMode = false;
      },
      error: (error) => {
        this.toast.presentFailedToast(error.error.message || environment.genericError);
      },
    });
  }

  closeForm() {
    this.isEditMode = false;
    this.selectedUser = null;
  }
}
