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
import { FaqDto } from "../../services/admin-models.service";
import { AdminServiceService } from "../../services/admin-service.service";
import { PagedResponse } from "../../services/base-models.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { CommonModule } from "@angular/common";
import { Appheader } from "../../components/header/appheader.component";
import { PipesModule } from "../../pipes/pipes.module";
import { environment } from "../../../environments/environment";

@Component({
	selector: "app-faqadmin",
	templateUrl: "./faqadmin.component.html",
	styleUrls: ["./faqadmin.component.scss"],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		NgSelectModule,
		ComponentsModule,
		Appheader,PipesModule
	],
	providers: [ToastComponent],
})
export class FaqadminComponent implements OnInit {
	createFaqForm: UntypedFormGroup;
	FaqList: FaqDto[] = [];
	origFaqList: FaqDto[] = [];
	selectedFaq: FaqDto;
	isEditMode = false;

	@Input()
	public isPopOver = false;

	searching = false;
	searchTerm = "";
	searchControl: UntypedFormControl;
	public searchForm: UntypedFormGroup;

	constructor(
		private authService: AuthService,
		private adminService: AdminServiceService,
		private modalController: ModalController,
		private popoverCtrl: PopoverController,
		private toast: ToastComponent,
	) {
		this.searchForm = new UntypedFormGroup({
			searchControl: new UntypedFormControl(""),
		});

		this.getFaqs();
	}

	//a function to seach country by name from countryList
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	searchFaqs(event: any) {
		const searchValue = event;

		if (searchValue && searchValue.trim() !== "") {
			this.FaqList = this.FaqList.filter((Faq) => {
				return Faq.question
					.toLocaleLowerCase()
					.includes(searchValue?.toLocaleLowerCase());
			});
		} else {
			this.FaqList = this.origFaqList;
		}
	}

	ngOnInit() {
		this.createFaqForm = new UntypedFormGroup({
			question: new UntypedFormControl("", Validators.required),
			answer: new UntypedFormControl("", Validators.required),
			rank: new UntypedFormControl("", Validators.required),
			status: new UntypedFormControl(true),
		});

		this.searchForm
			.get("searchControl")
			.valueChanges.pipe(debounceTime(700), distinctUntilChanged())
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.subscribe((subreddit: any): void => {
				this.searchFaqs(subreddit);
			});
	}

	validations = {
		question: [{ type: "required", message: "Question is required." }],
		answer: [{ type: "required", message: "Answer is required." }],
		rank: [{ type: "required", message: "Rank is required." }],
	};

	async cancelModal() {
		if (this.isPopOver) {
			this.popoverCtrl.dismiss({});
		} else {
			await this.modalController.dismiss(null);
		}
	}

	updateFaq() {
		if (this.selectedFaq == null) {
			this.postFaq();
		} else {
			this.editFaq();
		}
	}

	postFaq() {
		const FaqDto: FaqDto = {
			question: this.createFaqForm.controls.question.value,
			answer: this.createFaqForm.controls.answer.value,
			rank: this.createFaqForm.controls.rank.value,
			status: this.createFaqForm.controls.status.value,
			id: 0,
		};

		this.adminService.postFaq(FaqDto).subscribe({
			next: (result) => {
				this.isEditMode = false;
				this.selectedFaq = null;

				this.toast.presentSuccess();
				this.createFaqForm.reset();
				this.getFaqs();
			},
			error: (error) => {
				this.toast.presentFailedToast(error.error.message || environment.genericError);
			},
		});
	}

	//function to edit Faq
	editFaq() {
		const FaqDto: FaqDto = {
			question: this.createFaqForm.controls.question.value,
			answer: this.createFaqForm.controls.answer.value,
			rank: this.createFaqForm.controls.rank.value,
			status: this.createFaqForm.controls.status.value,
			id: this.selectedFaq.id,
		};

		this.adminService.putFaq(FaqDto).subscribe({
			next: (result) => {
				this.selectedFaq = null;
				this.isEditMode = false;
				this.toast.presentSuccess();
				this.getFaqs();
			},
			error: (error) => {
				this.toast.presentFailedToast(error.error.message || environment.genericError);
			},
		});
	}

	//function to get a list of cities using the getFaq endpoint
	getFaqs() {
		this.adminService.getFaqs(1, 500).subscribe({
			next: (result) => {
				this.FaqList = result.data;
				this.origFaqList = result.data;
			},
			error: (error) => {
				this.toast.presentFailedToast(error.error.message || environment.genericError);
			},
		});
	}

	editFaqForm(Faq: FaqDto) {
		this.selectedFaq = Faq;
		this.isEditMode = true;
		this.populateForm();
	}

	//funtion to pupulate the form with the selected Faq
	populateForm() {
		this.createFaqForm.controls.question.setValue(this.selectedFaq.question);
		this.createFaqForm.controls.answer.setValue(this.selectedFaq.answer);
		this.createFaqForm.controls.rank.setValue(this.selectedFaq.rank);
		this.createFaqForm.controls.status.setValue(this.selectedFaq.status);
	}

	cancelForm() {
		this.isEditMode = false;
	}

	newRecord() {
		this.isEditMode = true;
		this.selectedFaq = null;
		this.createFaqForm.reset();
	}
}
