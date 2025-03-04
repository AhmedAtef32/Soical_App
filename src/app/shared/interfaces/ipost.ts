
export interface IPost {
  _id: string
  body: string
  image: string
  user: User
  createdAt: string
  comments: Comment[]
  id: string
}

export interface User {
  _id: string
  name: string
  photo: string
}

export interface Comment {
  _id: string
  content?: string
  commentCreator: CommentCreator
  post: string
  createdAt: string

}

export interface CommentCreator {
  _id: string
  name: string
  photo: string
}
