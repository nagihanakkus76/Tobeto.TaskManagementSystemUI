import { UpdateTaskFormModel } from "./update-task-form.model";

export interface UpdateTaskModel {
  id: number
  title: string
  description: string
  status: number
}

export function convertFormToTaskUpdateModel(form: UpdateTaskFormModel): UpdateTaskModel {
  return {
    id: form.id.value,
    title: form.title.value,
    description: form.description.value,
    status: parseInt(form.status.value.toString())
  };
}
