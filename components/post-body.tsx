import markdownStyles from "./markdown-styles.module.css";
const Renderer = require("prosemirror-to-html-js").Renderer;
type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  const renderer = new Renderer();

  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: renderer.render(content) }} />
    </div>
  );
};

export default PostBody;
