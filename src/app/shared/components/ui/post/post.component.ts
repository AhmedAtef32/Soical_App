import { Component, Input, input } from '@angular/core';
import { IPost } from '../../../interfaces/ipost';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input({required:true}) post!:IPost;
}
