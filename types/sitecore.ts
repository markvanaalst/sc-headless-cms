export type Blogpost = {
  id: string;
  Title: string;
  Abstract?: string;
  Body: string;
  Author: AuthorResults;
  Categories: CategoryResults;
  PublishDate: Date;
  CoverImage: string;
};

export type BlogpostsResult = {
  total: string;
  results: Blogpost[];
};

export type CategoryResults = {
  results: Category[];
};
export type Category = {
  Name: string;
};

export type AuthorResults = {
  results: BlogAuthor[];
};

export type BlogAuthor = {
  Name: string;
  ProfilePictureUrl: string;
};
