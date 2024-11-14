import { IAuthor } from "./IAuthor";

export interface IBlog {
  blogId: number;
  title: string;
  user: IAuthor;
  category: string;
  createdAt: Date;
  content: string;
  userId: number;
}