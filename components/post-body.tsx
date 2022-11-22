import markdownStyles from "./markdown-styles.module.css";
import { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import { useMemo } from "react";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { Text } from "@tiptap/extension-text";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Link } from "@tiptap/extension-link";

type Props = {
  content: JSONContent;
};

const PostBody = ({ content }: Props) => {
  const output = useMemo(() => {
    return generateHTML(content, [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading,
      ListItem,
      Blockquote,
      BulletList,
      Code,
      CodeBlock,
      HardBreak,
      HorizontalRule,
      Italic,
      OrderedList,
      Strike,
      Link,
    ]);
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose" dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  );
};

export default PostBody;
