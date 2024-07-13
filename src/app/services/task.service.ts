import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AddTaskModel } from "../models/task/add/add-task.model";
import { Observable } from "rxjs";
import { AddTaskResponseModel } from "../models/task/add/add-task-response.model";
import { UpdateTaskModel } from "../models/task/update/update-task.model";
import { UpdateTaskResponseModel } from "../models/task/update/update-task-response.model";
import { GetListResponseModel } from "../models/task/get-list/get-list-response.model";
import { GetByIdResponseModel } from "../models/task/get-by-id/get-by-id-response.model";
import { ChangeStatusResponseModel } from "../models/task/change-status/change-status-response.model";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiControllerUrl = `${environment.apiUrl}/api/Tasks`;
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.token = localStorageService.get("token") ?? ""
  }

  add(data: AddTaskModel): Observable<AddTaskResponseModel> {
    return this.http.post<AddTaskResponseModel>(this.apiControllerUrl, data, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  update(data: UpdateTaskModel): Observable<UpdateTaskResponseModel> {
    return this.http.put<UpdateTaskResponseModel>(this.apiControllerUrl, data, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  getList(): Observable<GetListResponseModel[]> {
    return this.http.get<GetListResponseModel[]>(this.apiControllerUrl, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  getByID(id: number): Observable<GetByIdResponseModel> {
    return this.http.get<GetByIdResponseModel>(`${this.apiControllerUrl}/${id}`, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiControllerUrl}/${id}`, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  changeStatus(id: number, statusID: number): Observable<ChangeStatusResponseModel> {
    return this.http.put<ChangeStatusResponseModel>(`${this.apiControllerUrl}/${id}/change-status/${statusID}`, null, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  changeStatusNew(id: number): Observable<ChangeStatusResponseModel> {
    return this.http.put<ChangeStatusResponseModel>(`${this.apiControllerUrl}/${id}/change-status/new`, null, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  changeStatusInProgress(id: number): Observable<ChangeStatusResponseModel> {
    return this.http.put<ChangeStatusResponseModel>(`${this.apiControllerUrl}/${id}/change-status/in-progress`, null, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

  changeStatusCompleted(id: number): Observable<ChangeStatusResponseModel> {
    return this.http.put<ChangeStatusResponseModel>(`${this.apiControllerUrl}/${id}/change-status/completed`, null, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`
      }
    });
  }

}
