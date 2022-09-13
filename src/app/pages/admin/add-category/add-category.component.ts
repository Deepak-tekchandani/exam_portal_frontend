import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title:'',
    description:'',
  }

  constructor(public _category:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.description==null){
      this._snack.open('Title required !!' , '',{
        duration:3000
      });
      return;

    }
    //all done
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !! ','category is Added Successfuly !!','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !! ','Server Error !!','error');
      }
    );
  }

}
