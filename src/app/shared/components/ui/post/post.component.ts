import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Comment, IPost } from '../../../interfaces/ipost';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { CommentsService } from '../../../services/comments.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  imports: [DatePipe ,FormsModule],
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


  ngOnInit(): void {
    if(isPlatformBrowser(this._pLATFORM_ID)){
      this._authService.userID.subscribe({
        next: (res)=>{
          this.userID = res
        }
      })
    }

  }

  getData(){
    this.showComments = !this.showComments
    this.comments = this.post.comments
  }


  postComment(data:string,postID:string){
    this._commentsService.postCommrnt(data,postID).subscribe({
      next: (res)=>{
        console.log(res)
        this._toastrService.success("Comment Added")
        this.post.comments = res.comments
        this.commentData = ''
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


  deletePost(commentID:string){
    this._commentsService.deleteComment(commentID).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }

  toogelIconeMune(list:HTMLElement){
    list.classList.toggle('hidden')
  }

}
