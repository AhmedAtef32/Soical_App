import { PostsService } from './../../../shared/services/Posts/posts.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PostComponent } from "../../../shared/components/ui/post/post.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { isPlatformBrowser } from '@angular/common';
import { IPost } from '../../../shared/interfaces/ipost';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [PostComponent,InfiniteScrollDirective,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


 private readonly postsService=inject(PostsService);
 private readonly pLATFORM_ID=inject(PLATFORM_ID);
 private readonly toastrService=inject(ToastrService);

 AllPosts:IPost[] =[]
  page:number=1
  skeleton:number[] =[1,2,3,4,5]
  callApi:boolean = true
  postBody:string = ''
  postFile !: File
  isCreatePost:boolean = false
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {

      this.getAllposts()
    }
  }


  //get img File
  onFileSelected(event:any){
   this.postFile = event.target.files[0]
  }


  //Create A post
  creatPost(){
   let postData:FormData = new FormData()
   postData.append('body',this.postBody);
   postData.append('image',this.postFile);
    this.isCreatePost = true
   this.postsService.creatPost(postData).subscribe({
     next: (res) => {
      this.isCreatePost = false
      this.toastrService.success("Post Added")
      console.log(res);
     },error: (err) => {
      this.isCreatePost = false
     }
   })
  }

  //toogle model
  toogleModel(model:HTMLElement){
    if (model.classList.contains('hidden')) {

      model.classList.remove('hidden')
      model.classList.add('flex')
    }else{
      model.classList.remove('flex')
      model.classList.add('hidden')
    }
  }


  // get Posts Depending on the page
  getAllposts(){
    this.callApi= true
    this.postsService.getAllposts(this.page).subscribe({
      next: (res) => {
        this.AllPosts.push(...res.posts)
        console.log(this.AllPosts);
        this.callApi = false
      }
    })

    this.page++
  }


  // fire function get posts when scrolling button
  onScroll() {
    this.getAllposts()
  }
}
