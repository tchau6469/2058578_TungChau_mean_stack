import { TokenType } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-the-tracker',
  templateUrl: './the-tracker.component.html',
  styleUrls: ['./the-tracker.component.css']
})
export class TheTrackerComponent implements OnInit {

  dataSource:any[] = [];

  columnsToDisplay = ["ID", "Name", "Task", "Deadline"];

  taskRef:FormGroup = new FormGroup ({
    id: new FormControl(""),
    name: new FormControl(""),
    task: new FormControl(""),
    deadline: new FormControl("")
  })

  constructor() { }

  ngOnInit(): void {
  }

  addTask():void {
    let info = this.taskRef.value;
    this.dataSource.push({id: info.id, name: info.name, task: info.task, deadline: info.deadline});
    this.taskRef.reset();
  }

  resetTable() {
    this.dataSource = [];
  }
}
