import { IAuthor } from "./IAuthor";

export interface IBlogCreation {
  title: string;
  category: string;
  content: string;
  user: IAuthor;
}