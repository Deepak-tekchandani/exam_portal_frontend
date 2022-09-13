import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {

  categroies = [
    {
      id:'',
      title:'',
      description:'',
    }, 
  ];

  quizData={
    title:'',
    description :'',
    maxMarks : '',
    numberOfQuestions :'',
    active:true,
    categoryEntity : {
      id:'',
    },
  }


  constructor(private _quiz:QuizService ,private _cat:CategoryService , private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categroies=data;
        console.log(this.categroies);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !! ','Server Error !!','error');

      }
    );
  }

  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title.trim()==null){
      this._snack.open('Title required !!' , '',{
        duration:3000
      });
      return;
    }
    if(this.quizData.categoryEntity.id=='' || this.quizData.categoryEntity.id==null){
      this._snack.open('category required !!' , '',{
        duration:3000
      });
      return;
    }
    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success !! ','Quiz is Added Successfuly !!','success');
        this.quizData={
          title:'',
          description :'',
          maxMarks : '',
          numberOfQuestions :'',
          active:true,
          categoryEntity : {
            id:'',
          },
        }
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !! ','Error While Adding Quiz !!','error');
      }
    );
    
  }

}
