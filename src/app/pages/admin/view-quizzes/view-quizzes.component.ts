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
      id :'',
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

  //Delete Quiz
  deleteQuiz(id:any)
  {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //Delete
        this._quiz.deleteQuiz(id).subscribe(
          (data)=> {
            this.quizzes =  this.quizzes.filter((quize)=> quize.id != id);
            Swal.fire('Success','Quiz deleted','success')
          },(erroe)=>{
            Swal.fire('Error','Error is Deleting Quiz','error')
          }
        )
      }
    })

  }

}
