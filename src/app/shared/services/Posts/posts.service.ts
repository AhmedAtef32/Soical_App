import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroments } from '../../../core/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httopclinet : HttpClient) { }


  getAllposts(page:number):Observable<any>{
    return this.httopclinet.get(`${Enviroments.baseUrl}/posts?limit=2&page=${page}`)
  }
}
