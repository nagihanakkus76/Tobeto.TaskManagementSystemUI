import { Injectable, Pipe } from "@angular/core";
import { GetListResponseModel } from "../models/task/get-list/get-list-response.model";



@Pipe({
  name: 'filterTask',
  standalone: true
})
export class FilterTaskPipe {
  transform(value: GetListResponseModel[], search?: string): GetListResponseModel[] {
    if (!search) {
      return value;
    }

    return value.filter(p =>
      p.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())||
      p.description?.toLocaleLowerCase().includes(search.toLocaleLowerCase())||
      p.status?.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())||
      p.creationDate?.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

  }
}
