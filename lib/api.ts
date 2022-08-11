import Author from "../types/author";
import PostType from "../types/post";
import { BlogAuthor, Blogpost, BlogpostsResult } from "../types/sitecore";

const POST_GRAPHQL_FIELDS = `
    __typename
    total
    results {
      id
      Title: title
      Abstract: abstract
      Body: body
      PublishDate: publishDate
      #CoverImage: coverImage
      Author: author {
        results {
          ... on MvaAuthor {
            Name: fullName
            ProfilePictureUrl: profilePictureUrl
          }
        }
      }
      Categories: categories {
        results {
          ... on MvaCategory {
            Name: categoryName
          }
        }
      }
    }
`;

async function fetchAPI(query: string) {
  return fetch(process.env.SITECORE_ENDPOINT_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GQL-Token": process.env.SITECORE_DEV_AUTH_TOKEN as string,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getAllPosts(preview: boolean): Promise<PostType[]> {
  const data = await fetchAPI(
    `{ 
      data: allMvaBlogpost
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPosts(data.data);
}

export async function getAllPostsWithSlug(): Promise<PostType[]> {
  const data = await fetchAPI(
    `{ 
      data: allMvaBlogpost(where: { id_neq : null } )
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPosts(data.data);
}

export async function getPostBySlug(slug: string): Promise<PostType> {
  const data = await fetchAPI(
    `{ 
      data: allMvaBlogpost(where: { id_eq: "${slug}" })
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPost(data.data);
}

function extractPost({ data }: { data: BlogpostsResult }) {
  return parsePost(data.results[0]);
}

function extractPosts({ data }: { data: BlogpostsResult }) {
  return data.results.map((post: Blogpost) => {
    return parsePost(post);
  });
}

function parseAuthor(author: BlogAuthor): Author {
  return {
    name: author.Name,
    picture: author.ProfilePictureUrl,
  };
}

function parsePost(post: Blogpost): PostType {
  return {
    title: post.Title,
    slug: post.id,
    date: post.PublishDate.toString(),
    content: post.Body,
    excerpt: post.Abstract ? post.Abstract : "",
    //coverImage: post.CoverImage,
    coverImage: "https://picsum.photos/800/500",
    author: parseAuthor(post.Author.results[0]),
    ogImage: {
      url: "",
    },
  };
}
