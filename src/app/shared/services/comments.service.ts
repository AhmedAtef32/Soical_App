import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroments } from '../../core/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient : HttpClient) { }

  postCommrnt(content:string ,postID:string):Observable<any>{
    return this.httpClient.post(`${Enviroments.baseUrl}/comments`,
      {
        content : content,
        post : postID
      }
    )
  }

  UpdateComment(content:object ,commentID:string):Observable<any>{
    return this.httpClient.put(`${Enviroments.baseUrl}/comments/${commentID}`,content)
  }

  deleteComment(commentID:string):Observable<any>{
    return this.httpClient.delete(`${Enviroments.baseUrl}/comments/${commentID}`)
  }
}
