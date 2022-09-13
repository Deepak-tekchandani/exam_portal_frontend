import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  
  quizzes=[
    {
      title:'',
      description :'',
      maxMarks : '',
      numberOfQuestions :'',
      categoryEntity : {
        title : '',
      },
    }
  ];

  constructor(public _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!' , 'Error in loading Data ','error');
      }
    )
  }

}
