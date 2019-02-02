import { TodoService } from "./../../services/todo.service";
import { Todo } from "./../../models/Todo";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  setClasses() {
    let classes = {
      todo: true,
      "is-complete": this.todo.completed
    };
    return classes;
  }

  onToggle(todo: Todo) {
    //Toggle in UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe();
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
