import { AddTaskFormModel } from "./add-task-form.model";

export interface AddTaskModel {
  title: string
  description: string
  userID: number
}

export function convertFormToTaskAddModel(form: AddTaskFormModel): AddTaskModel {
  return {
    title: form.title.value,
    description: form.description.value,
    userID: form.userID.value
  };
}
