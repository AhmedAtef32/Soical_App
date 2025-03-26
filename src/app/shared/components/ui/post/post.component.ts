import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Comment, IPost } from '../../../interfaces/ipost';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { CommentsService } from '../../../services/comments.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../services/Posts/posts.service';

@Component({
  selector: 'app-post',
  imports: [FormsModule , ReactiveFormsModule, RouterLink , DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit  {

  userID!:string;

 private readonly  _commentsService = inject(CommentsService)
 private readonly  _pLATFORM_ID = inject(PLATFORM_ID)
 private readonly  _authService = inject(AuthService)
 private readonly  _toastrService = inject(ToastrService)
 private readonly  _postService = inject(PostsService)

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

  // Form Update Comment
  updateForm:FormGroup = new FormGroup({
    content : new FormControl(null)
  })



/**
*this function for post if isUpdating = false or update comment if isUpdating = true
*
 */
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




   /**
    *  this function for delete comment
    */
  deletecomment(commentID:string){
    this._commentsService.deleteComment(commentID).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }



  /**
   * @description
   * This function takes an id of comment that will be updated , comment object and index of comment in the comments array of post
   * @param id {string} - id of comment
   * @param comment {Comment} - comment object
   * @param index {number} - index of comment in the comments array of post
   */
  editComment(id:string,comment:Comment,index:number){
    this.isUpdating = true
    this.updateCommentID = id
    this.commentIindex = index

    this.updateForm.patchValue({
      content : comment.content
    })

  }



  /**
   * @description
   * delete post by id
   * @param id {string} - id of post
   */
  deletePost(id:string):void{
    this._postService.deletePost(id).subscribe({
      next: (res)=>{
        console.log(res.post);
        this._toastrService.success("Post Deleted")
        setTimeout(() => {

          window.location.reload()
        }, 500);
      }
    })
  }

  /**
   * Toggle the 'hidden' class on the given HTMLElement.
   * This function is used to toogle the post menu (the three dots)
   * @param list {HTMLElement} - the HTMLElement that will be toggled
   */
  toogelIconeMune(list:HTMLElement){
    list.classList.toggle('hidden')
  }

}
