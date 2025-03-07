import { Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {  ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../shared/services/Posts/posts.service';
import { Comment, IPost } from '../../../shared/interfaces/ipost';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CommentsService } from '../../../shared/services/comments.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-post-detailes',
  imports: [ ReactiveFormsModule , FormsModule ,DatePipe],
  templateUrl: './post-detailes.component.html',
  styleUrl: './post-detailes.component.scss'
})
export class PostDetailesComponent implements OnInit {

 private readonly _activatedRoute = inject(ActivatedRoute);
 private readonly _postsService = inject(PostsService);
 private readonly  _commentsService = inject(CommentsService)
 private readonly  _pLATFORM_ID = inject(PLATFORM_ID)
 private readonly  _authService = inject(AuthService)
 private readonly  _toastrService = inject(ToastrService)

 userID!:string;
 postID!:string
 post!:IPost
 isCalingApiPost:boolean = true
   comments!:Comment[]
   showComments:boolean = false
   commentData:string = ''
   isCailngApi : boolean = false
   isUpdating: boolean = false
   updateCommentID!:string
   commentIindex!:number
 ngOnInit(): void {

  //get user ID
  if(isPlatformBrowser(this._pLATFORM_ID)){
      this._authService.userID.subscribe({
        next: (res)=>{
          this.userID = res
        }
      })
    }

  this.getPostIDFromUrl()
  this.getPost()
 }

   // Update Comment
   updateForm:FormGroup = new FormGroup({
     content : new FormControl(null)
   })

//get post id from url
  getPostIDFromUrl():void{
    this._activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.postID = res.get('id')!
      }
     })
  }

  //get singile post
  getPost():void{

    this._postsService.getSinglePost(this.postID).subscribe({
      next: (res)=>{
        this.post = res.post
        console.log( this.post);
        this.isCalingApiPost = false
      }
    })
  }


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
   * and make the comment form ready to update the comment
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
   * Toggle the 'hidden' class on the given HTMLElement.
   * This function is used to toogle the post menu (the three dots)
   * @param list {HTMLElement} - the HTMLElement that will be toggled
   */
   toogelIconeMune(list:HTMLElement){
    list.classList.toggle('hidden')
  }

}
