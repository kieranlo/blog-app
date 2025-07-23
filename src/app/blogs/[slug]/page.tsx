import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import styles from "../blog.module.css";
import { use } from "react";

// Function to transform image URIs based on environment
function transformImageUri(src: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/blog-app' : '';
  return `${basePath}${src}`;
}

// Add this function to tell Next.js which slugs to generate
export async function generateStaticParams() {
  const blogsDirectory = path.join(process.cwd(), "src", "app", "blogs", "content");
  const filenames = fs.readdirSync(blogsDirectory);
  
  // Filter for markdown files and remove extensions
  const slugs = filenames
    .filter(filename => filename.endsWith(".md"))
    .map(filename => ({
      slug: filename.replace(/\.md$/, "")
    }));
  
  return slugs;
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } =  use(params);
  
  // Path to the specific markdown file
  const markdownFilePath = path.join(process.cwd(), "src", "app", "blogs", "content", `${slug}.md`);
  
  // Check if file exists
  if (!fs.existsSync(markdownFilePath)) {
    notFound();
  }
  
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
  
  // Extract headings for navigation
  const headings = [];
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    
    headings.push({ level, text, id });
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogContent}>
        <ReactMarkdown 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            img: ({...props}) => {
              const srcString = typeof props.src === 'string' ? props.src : '';
              return <img {...props} src={transformImageUri(srcString)} alt={props.alt || ''} />;
            },
            h2: ({...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-') || ''} {...props} />,
            h3: ({...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-') || ''} {...props} />,
            ol: ({...props}) => <ol className={styles.ol} {...props} />,
            ul: ({...props}) => <ul className={styles.ul} {...props} />,
        }}>
          {markdownContent}
        </ReactMarkdown>
      </div>
      
      <div className={styles.navigationPane}>
        <nav>
          <ul>
            {headings.map((heading, index) => (
              <li 
                key={index} 
                className={`${styles.navItem} ${styles[`level-${heading.level}`]}`}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}