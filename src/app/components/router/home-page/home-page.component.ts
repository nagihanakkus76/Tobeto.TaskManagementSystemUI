import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateButtonComponent } from "../../../shared/buttons/create-button/create-button.component";
import { EditButtonComponent } from "../../../shared/buttons/edit-button/edit-button.component";
import { DeleteButtonComponent } from "../../../shared/buttons/delete-button/delete-button.component";
import { SubmitButtonComponent } from "../../../shared/buttons/submit-button/submit-button.component";
import { CancelButtonComponent } from "../../../shared/buttons/cancel-button/cancel-button.component";
import { NormalInputComponent } from "../../../shared/buttons/inputs/normal-input/normal-input.component";
import { GetListResponseModel } from '../../../models/task/get-list/get-list-response.model';
import { TaskService } from '../../../services/task.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskFormModel } from '../../../models/task/add/add-task-form.model';
import { convertFormToTaskAddModel } from '../../../models/task/add/add-task.model';
import { convertFormToTaskUpdateModel, UpdateTaskModel } from '../../../models/task/update/update-task.model';
import { UpdateTaskFormModel } from '../../../models/task/update/update-task-form.model';
import { CommonModule } from '@angular/common';
import { FilterTaskPipe } from '../../../pipes/filter-task.pipe';
import { StandartDialogComponent } from '../../../shared/popups/standart-dialog/standart-dialog.component';
import { LayoutComponent } from "../../../shared/layout/layout.component";
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { BsToastSuccessComponent } from "../../../shared/alerts/bs-toast-success/bs-toast-success.component";
import { BsToastErrorComponent } from "../../../shared/alerts/bs-toast-error/bs-toast-error.component";




@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CreateButtonComponent, EditButtonComponent, DeleteButtonComponent, SubmitButtonComponent, CancelButtonComponent, NormalInputComponent, MatTableModule, FilterTaskPipe, LayoutComponent, BsToastSuccessComponent, BsToastErrorComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  @ViewChild(BsToastSuccessComponent) toastSuccess: BsToastSuccessComponent
  @ViewChild(BsToastErrorComponent) toastError: BsToastErrorComponent

  isShowCreateSection: boolean = false;
  isShowUpdateSection: boolean = false;
  createDataForm!: FormGroup<AddTaskFormModel>;
  updateDataForm!: FormGroup<UpdateTaskFormModel>;
  get createControl() { return this.createDataForm.controls; }
  get updateControl() { return this.updateDataForm.controls; }


  isFormInvalid = (fc: FormControl) => fc.invalid && (fc.dirty || fc.touched || this.formSubmitted)
  formSubmitted: boolean = false;
  dataList: GetListResponseModel[] = [];
  editingData?: UpdateTaskModel
  createButtonText: string = "Kaydet"
  updateButtonText: string = "Güncelle"

  displayedColumns: string[] = ['no', 'actions'];
  statusName: string = "";
  statusColor: string = "";
  searchText?: string;
  loggedInUserID: string | null = "";

  constructor(private localStorageService: LocalStorageService, private taskService: TaskService, private formBuilder: FormBuilder, public popup: MatDialog, public authService: AuthService) {
    this.loggedInUserID = this.localStorageService.get("userID")

  }

  ngOnInit(): void {
    this.createDataForm = this.formBuilder.group({
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      userID: new FormControl()
    })

    this.updateDataForm = this.formBuilder.group({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      status: new FormControl(),

    })

    this.addDisplayedColumn("title", "description", "creationDate", "status")
    this.fillDataList()
  }


  getStatusName(id: number): string {
    switch (id) {
      case 0:
        this.statusName = "Yeni"
        break;
      case 1:
        this.statusName = "Devam Ediyor"
        break;
      case 2:
        this.statusName = "Tamamlandı"
        break;
    }
    return this.statusName;
  }

  getStatusColor(id: number): string {
    switch (id) {
      case 0:
        this.statusColor = "btn-outline-info"
        break;
      case 1:
        this.statusColor = "btn-outline-warning"
        break;
      case 2:
        this.statusColor = "btn-outline-success"
        break;
    }
    return this.statusColor;
  }

  addDisplayedColumn(...columnName: string[]): void {
    this.displayedColumns.splice(1, 0, ...columnName);
  }

  fillDataList(): void {
    this.taskService.getList().subscribe((res) => {
      this.dataList = res.filter(x => x.userID.toString() == this.loggedInUserID);
    })
  }

  editClicked(id: number) {
    this.isShowUpdateSection = true;
    this.isShowCreateSection = false;
    const data = this.dataList.filter(d => d.id == id)[0]

    this.updateControl.id.setValue(data.id)
    this.updateControl.title.setValue(data.title)
    this.updateControl.description.setValue(data.description)
    this.updateControl.status.setValue(data.status)
  }

  createClicked(): void {
    this.resetForm();
    this.isShowCreateSection = true;
    this.isShowUpdateSection = false;
  }

  saveClicked() {
    this.formSubmitted = true;
    if (this.createDataForm.invalid) {
      return;
    }

    var data = convertFormToTaskAddModel(this.createDataForm.controls)

    data.userID = parseInt(this.loggedInUserID ?? "0")
    this.taskService.add(data).subscribe(res => {
      this.toastSuccess.show("Kayıt Başarılı")
      this.fillDataList()
      this.resetForm();
    },
    (err) => {this.toastError.show("Kayıt Başarısız")}

  )


  }

  updateClicked() {
    this.formSubmitted = true;
    if (this.updateDataForm.invalid) {
      return;
    }

    var data = convertFormToTaskUpdateModel(this.updateDataForm.controls)

    this.taskService.update(data).subscribe(res => {
      this.toastSuccess.show("Güncelleme Başarılı")
      this.fillDataList()
      this.resetForm();
    },
    (err) => {this.toastError.show("Güncelleme Başarısız")}

  )


  }

  resetForm(): void {
    this.isShowCreateSection = false;
    this.isShowUpdateSection = false;
    this.createDataForm.reset();
    this.formSubmitted = false;
    this.createDataForm.markAsUntouched()
    this.createDataForm.markAsPristine()
  }

  cancelClicked() {
    this.resetForm();
  }

  updateCompleted(id: number) {
    const data = this.dataList.filter(d => d.id == id)[0]

    this.taskService.changeStatusCompleted(data.id).subscribe((res) => {
      this.toastSuccess.show("Durum Güncelleme Başarılı")

      this.fillDataList()
    },
    (err) => {this.toastError.show("Durum Güncelleme Başarısız")}


  )
  }

  updateInProgress(id: number) {
    const data = this.dataList.filter(d => d.id == id)[0]

    this.taskService.changeStatusInProgress(data.id).subscribe((res) => {
      this.toastSuccess.show("Durum Güncelleme Başarılı")

      this.fillDataList()
    },
    (err) => {this.toastError.show("Durum Güncelleme Başarısız")}

  )
  }

  updateNew(id: number) {
    const data = this.dataList.filter(d => d.id == id)[0]

    this.taskService.changeStatusNew(data.id).subscribe((res) => {
      this.toastSuccess.show("Durum Güncelleme Başarılı")

      this.fillDataList()
    },
    (err) => {this.toastError.show("Durum Güncelleme Başarısız")}

  )
  }


  showDeletePopup(id?: any) {
    const popupRef = this.popup.open(StandartDialogComponent, {
      data: {
        title: "Sil",
        message: "Kayıt Silinecek! Onaylıyor Musunuz?",
        yesText: "Onayla",
        yesClass: "btn-outline-danger",
        noText: "İptal Et",
        noClass: "btn-primary"
      }
    });

    popupRef.componentInstance.yesOrNo.subscribe((res) => {
      if (res) {
        this.deleteData(id)
      }

      this.popup.closeAll()
    })
  }

  deleteClicked(id: any): void {
    this.showDeletePopup(id);
  }

  deleteData(id: any): void {
    this.taskService.delete(id).subscribe(res => {
      this.toastSuccess.show("Kayıt Silme Başarılı")

      this.fillDataList()
      this.resetForm();
    },
    (err) => {this.toastError.show("Kayıt Silme Başarısız")}

  )
  }

  keyupSearch(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText = value
  }
}
