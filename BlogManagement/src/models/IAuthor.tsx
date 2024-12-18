export interface IAuthor {
  userId?: number; // optional property
  username: string;
  email: string;
  password: string;
  onUpdate: (author: IAuthor) => void;
}