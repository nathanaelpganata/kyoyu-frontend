export interface UserType {
  userId?: string;
  email: string;
  password: string;
  role: string;
  posts: PostType[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface PostType {
  postId?: string;
  title: string;
  slug: string;
  body: string;
  authorId: string;
  authorEmail: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
