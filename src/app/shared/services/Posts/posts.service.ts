import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroments } from '../../../core/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httopclinet : HttpClient) { }


  //get all posts
  getAllposts(page:number):Observable<any>{
    return this.httopclinet.get(`${Enviroments.baseUrl}/posts?limit=2&page=${page}`)
  }

  // Create Post
  creatPost(data:FormData):Observable<any>{
    return this.httopclinet.post(`${Enviroments.baseUrl}/posts`,data)
  }

  // get single Post
  getSinglePost(id:string):Observable<any>{
    return this.httopclinet.get(`${Enviroments.baseUrl}/posts/${id}`)
  }


  //get User Posts
  getUserPosts(id:string):Observable<any>{
    return this.httopclinet.get(`${Enviroments.baseUrl}/users/${id}/posts`)
  }


  //Delete user Post
  deletePost(id:string):Observable<any>{
    return this.httopclinet.delete(`${Enviroments.baseUrl}/posts/${id}`)
  }
}
