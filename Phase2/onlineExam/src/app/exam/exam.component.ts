import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { Questions } from '../questions';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
//starting values of the flags in order to show correct screen
homeFlag:boolean = true;
examFlag:boolean = false;
scoreFlag:boolean = false;

passed:boolean = false;
failed:boolean = false;

numberCorrect:number = 0;

myForm:FormGroup;
theQuestions:Array<Questions> = [];

questionLabels:any;

constructor(public form:FormBuilder, public questionsService: QuestionsService) {
    this.myForm= form.group({});
  }

  ngOnInit(): void {
    this.questionsService.loadJsonData().subscribe(data=> this.theQuestions =data, error => console.log(error), () => console.log("success"));
  }

  createForms() {
    this.theQuestions.forEach (q=> {
      this.myForm?.addControl(q.question, this.form.control(""));
      
      
    })

    //going to the test screen
    this.homeFlag = false;
    this.examFlag = true;
    
    this.questionLabels = document.getElementsByTagName("label");
    
  }


  getLabels(q:Questions) : any[]{
    let array:any[] = [];

    for (let labels of this.questionLabels) {
      if (labels.htmlFor == q.question) {
        array.push(labels);
      }
    }

    return array;
  }


  findCorrectElement(array:any[], q:Questions):any {
    for (let ele of array) { 
      if (ele.textContent == q.correctAns) return ele;
    }
  } 

  findIncorrectElement(array:any[], userAnswer:string) {
    for (let ele of array) {
      if (userAnswer == ele.textContent) return ele;
    }
    return null;
  }

  submit() : void {

    
    let userAnswers = this.myForm.value;
    console.log(userAnswers);

    
    for (let q of this.theQuestions) {

      
      let array:any[] = this.getLabels(q);

      let correctElement = this.findCorrectElement(array, q);
      
      if (userAnswers[q.question] == q.correctAns) {
        
        correctElement.style.backgroundColor = "green";
        this.numberCorrect++;
        console.log("CORRECT!!!!")
      } 
      else {
        let incorrectElement = this.findIncorrectElement(array, userAnswers[q.question]);
        if (incorrectElement != null) incorrectElement.style.backgroundColor = "red";
        correctElement.style.backgroundColor = "green";
        console.log("FALSE");
      }

    }

    this.myForm.disable();
    if (this.numberCorrect >=7) this.passed = true;
    else this.failed = true;
    this.scoreFlag = true;
    
  }//end submit()

}
