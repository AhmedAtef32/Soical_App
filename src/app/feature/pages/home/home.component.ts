import { PostsService } from './../../../shared/services/Posts/posts.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PostComponent } from "../../../shared/components/ui/post/post.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { isPlatformBrowser } from '@angular/common';
import { IPost } from '../../../shared/interfaces/ipost';

@Component({
  selector: 'app-home',
  imports: [PostComponent,InfiniteScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


 private readonly postsService=inject(PostsService);
 private readonly pLATFORM_ID=inject(PLATFORM_ID);
  page:number=1
  AllPosts:IPost[] =[]
  skeleton:number[] =[1,2,3,4,5]
  callApi:boolean = true

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {

      this.getAllposts()
    }
  }

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

  onScroll() {
    this.getAllposts()
  }
}
