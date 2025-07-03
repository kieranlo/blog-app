import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import styles from "../blog.module.css";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
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
        <ReactMarkdown components={{
          h2: ({node, ...props}) => <h1 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-') || ''} {...props} />,
          h3: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-') || ''} {...props} />
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