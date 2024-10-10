## Next.js App Router Course - Final

This is the final template for the Next.js App Router Course. It contains the final code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Example Post:

Protecting user rights in the context of AI and data usage is a critical ethical issue...111111111111111111111

```cpp
int32 largetNumber = 50;
private:
    UPROPERTY(EditAnywhere)
    AActor* OsuCharacter;
```

> WWWE

---

~~**_asdsa_**~~

## ASD

### as

# sTitle

## Title

![Wo_Long__Fallen_Dynasty_2023_07_09_13_29_31_kdkyvt](https://res.cloudinary.com/diy3s3seb/image/upload/v1721312231/Wo_Long__Fallen_Dynasty_2023_07_09_13_29_31_kdkyvt.png)

- abc
- edf
- ddd
- sdf
- -
-
-
-

```ts:markdown.tsx:57-85
'use client';
import React, { Fragment, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from '../components/utils/copy';
import { escapeHtml } from '../lib/escapeHtml';

type MarkdownRendererProps = {
  children: string;
};

const customStyle = {
  fontSize: '1rem',
  padding: '20px',
};

export function MarkdownRenderer({
  children: markdown,
}: MarkdownRendererProps) {
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const code = String(children).replace(/\n$/, '');
          const filename = match?.input.split(':')[1];
          const linesToHighlightInput = match?.input.split(':')[2];
          const linesToHighlight = linesToHighlightInput
            ? linesToHighlightInput.split(',').reduce((acc, line) => {
                if (line.includes('-')) {
                  const [start, end] = line.split('-').map(Number);
                  for (let i = start; i <= end; i++) {
                    acc.push(i);
                  }
                } else {
                  acc.push(Number(line));
                }
                return acc;
              }, [] as number[])
            : [];

          return !inline && match ? (
            <Fragment>
              {filename && (
                <div className="-mb-6 table max-w-full rounded-lg bg-slate-700 px-3 pb-4 pt-1 text-sm text-white">
                  <span>{escapeHtml(filename)}</span>
                </div>
              )}

              <div
                className="relative"
                onMouseEnter={() => setShowCopyToClipboard(true)}
                onMouseLeave={() => setShowCopyToClipboard(false)}
              >
                <SyntaxHighlighter
                  style={oneDark}
                  customStyle={customStyle}
                  showLineNumbers
                  PreTag="div"
                  language={match[1]}
                  wrapLines
                  lineProps={(lineNumber) => {
                    const style: any = {
                      display: 'block',
                      width: 'fit-content',
                    };
                    if (linesToHighlight.includes(lineNumber)) {
                      style.backgroundColor = '#334155';
                      style.borderColor = '#38bdf8';
                    }
                    return { style };
                  }}
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
                {showCopyToClipboard && <CopyButton copyContent={code} />}
              </div>
            </Fragment>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
```

123

<iframe width="1080" height="720" src="https://www.youtube.com/embed/gb7qXLnlaB4?si=mv_BGRqvSPjle3vd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe border=0 frameborder=0 height=750 width=550
 src="https://twitframe.com/show?url=https://twitter.com/Cerva_saiki/status/1812591071454699781?ref_src=twsrc%5Etfw"></iframe>

<iframe
  src="https://player.cloudinary.com/embed/?public_id=ThePathOfOsu_-_Unreal_Editor_2024-03-03_16-25-45_dlxws7&cloud_name=diy3s3seb"
  width="640"
  height="360" 
  style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
  allowfullscreen
  frameborder="0"
></iframe>

# Markdown

## Markdown

### Markdown

#### Markdown

##### Markdown

###### Markdown

**Bold**  
_Italic_  
~~Strikethrough~~

1. First item
2. Second item
3. Third item

- Unordered item
- Unordered item
- Unordered item

[Link](https://www.example.com)

![Image](<https://cdn.vox-cdn.com/thumbor/6z9EcmyiAJ00A_eP5tk2DmVeYe0=/0x15:500x348/1200x800/filters:focal(0x15:500x348):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif>)

![Image](https://static.zenn.studio/images/drawing/discussion.png)

```javascript
console.log("Hello, World!");
```

```cpp
int main() {
  int y = 5 + 6;
 cout << "Hellow World! " << x << std::endl();
}
```

> Blockquote

---

- [ ] Task 1
- [x] Task 2

---

| Header 1 | Header 2 |
| -------- | -------- |
| Data 1   | Data 2   |

---

<details>  
<summary>Details</summary>  
Details content  
</details>
