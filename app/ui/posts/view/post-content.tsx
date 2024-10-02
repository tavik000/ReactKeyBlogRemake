import { Post } from '../../../lib/definitions';
import { MarkdownRenderer } from '../../markdown';

export default function PostContent({ post }: { post: Post }) {
  return (
    <article className="prose-base markdown text-wrap">
      <MarkdownRenderer>{post.content}</MarkdownRenderer>
    </article>
  );
}
