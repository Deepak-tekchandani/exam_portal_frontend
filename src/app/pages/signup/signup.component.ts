import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user ={
    username : '',
    password : '',
    firstname : '',
    lastname : '',
    email : '',
    phone : ''
  } 

  ngOnInit(): void {
  }
  formSubmit(){
    // alert('submit')
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      // alert('user is required !!')
      //User snackbar
      this.snack.open('username is required !!','',{
        duration:3000,
      });
      return;
    }

    //add user : userService

    this.userService.addUser(this.user).subscribe(
      (data : any)=>{
        //success
        console.log(data)
        // alert('success!!');
        Swal.fire('successfully Done ','user Id and name is  '+data.id+' and '+data.username,'success');
      },
      (error)=>{
        //error
        console.log(error)
        // alert('something went wrong!!')
        this.snack.open('something went wrong !!','',{
          duration:2000,
        })
      }
    )

  }
  
  

}
