import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../shared/services/Posts/posts.service';
import { PostComponent } from "../../../shared/components/ui/post/post.component";
import { IPost } from '../../../shared/interfaces/ipost';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _postsService = inject(PostsService);
  private readonly _toastrService = inject(ToastrService);
  userId!:string
  skeleton:number[] =[1,2,3,4,5]
  isCallApi:boolean = true
  userPosts!:IPost[]
  ngOnInit(): void {

    this.getUserIDFromUrl();
    this.getUserPosts();
  }


  //get user id from url
  getUserIDFromUrl():void{
    this._activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.userId = res.get('id')!
        console.log(this.userId)
      }
     })
  }

  //get user posts
  getUserPosts():void{
    this.isCallApi = true
    this._postsService.getUserPosts(this.userId).subscribe({
      next: (res)=>{
        console.log(res);
        this.userPosts = res.posts
        this.isCallApi = false
      },error: (err)=>{
        this.isCallApi = false
      }
    })
  }



}
