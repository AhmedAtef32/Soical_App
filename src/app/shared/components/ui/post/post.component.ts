import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Comment, IPost } from '../../../interfaces/ipost';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { CommentsService } from '../../../services/comments.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  imports: [DatePipe ,FormsModule , ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit  {

  userID!:string;

 private readonly  _commentsService = inject(CommentsService)
 private readonly  _pLATFORM_ID = inject(PLATFORM_ID)
 private readonly  _authService = inject(AuthService)
 private readonly  _toastrService = inject(ToastrService)

  @Input({required:true}) post!:IPost;

  comments!:Comment[]
  showComments:boolean = false
  commentData:string = ''
  isCailngApi : boolean = false
  isUpdating: boolean = false
  updateCommentID!:string
  commentIindex!:number
  
  ngOnInit(): void {
    if(isPlatformBrowser(this._pLATFORM_ID)){
      this._authService.userID.subscribe({
        next: (res)=>{
          this.userID = res
        }
      })
    }

  }

  updateForm:FormGroup = new FormGroup({
    content : new FormControl(null)
  })

  getData(){
    this.showComments = !this.showComments
    this.comments = this.post.comments
  }


  postOrUpdateComment(data:string,postID:string){
    this.isCailngApi = true ;

    if (this.isUpdating) {
      this._commentsService.UpdateComment(this.updateForm.value , this.updateCommentID).subscribe({
        next: (res)=>{
          this._toastrService.success("Comment Updated");
          console.log(res)
          this.post.comments[this.commentIindex]= res.comment
          this.isUpdating = false
        this.isCailngApi = false ;

        },
        error: (err)=>{
          this.isUpdating = false
    this.isCailngApi = false ;

        }
      })
    }else{
      this._commentsService.postCommrnt(data,postID).subscribe({
        next: (res)=>{
          console.log(res)
          this._toastrService.success("Comment Added")
          this.post.comments = res.comments
          this.commentData = ''
          this.isCailngApi = false
        },
        error: (err)=>{
          this.isCailngApi = false
        }
      })
    }

  }

  pathVaild(comment:any){
    this.comments = this.post.comments
    console.log(comment)
  }

  deletePost(commentID:string){
    this._commentsService.deleteComment(commentID).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }

  editComment(id:string,comment:Comment,index:number){
    this.isUpdating = true
    this.updateCommentID = id
    this.commentIindex = index

    this.updateForm.patchValue({
      content : comment.content
    })

  }

  toogelIconeMune(list:HTMLElement){
    list.classList.toggle('hidden')
  }

}
