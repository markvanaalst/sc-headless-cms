import { TypedObject } from "@portabletext/types";

import Author from "./author";
import Media from "./media";

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: Media;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export default PostType;
