import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  fetchTodos() {
    console.log("API_URL :", environment.API_URL);
    return this.http.get<Todo[]>(`${environment.API_URL}`);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${environment.API_URL}${id}`);
  }

  addTodo(payload: Todo) {
    return this.http.post<Todo>(`${environment.API_URL}`, payload);
  }

  updateTodo(payload: Todo, id: number) {
    return this.http.put<Todo>(`${environment.API_URL}${id}`, payload);
  }
}
