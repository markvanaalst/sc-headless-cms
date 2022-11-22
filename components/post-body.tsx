import { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import { useMemo } from "react";
import { richTextProfile } from "../lib/richTextConfiguration";

type Props = {
  content: JSONContent;
};

const PostBody = ({ content }: Props) => {
  const output = useMemo(() => {
    return generateHTML(content, [richTextProfile]);
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose" dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  );
};

export default PostBody;
