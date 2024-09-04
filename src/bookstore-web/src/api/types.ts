export type Author = {
  id: number;
  books: Book[];
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type Book = {
  id: number;
  title: string;
  authors: Author[] | string;
  pages?: number;
  year?: number;
};
