import { Post } from '../../../lib/definitions';
import { MarkdownRenderer } from '../../markdown';

export default function PostContent({ post }: { post: Post }) {
  return (
    <article className="prose-base markdown">
      {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
      <MarkdownRenderer>{post.content}</MarkdownRenderer>
    </article>
  );
}
