import { fetchPostTags } from '@/app/lib/data';
import TagManage from './tag-manage';

export default async function TagManageWrapper({}: {}) {
  const postTags: string[] = await fetchPostTags();

  return <TagManage postTags={postTags} />;
}
