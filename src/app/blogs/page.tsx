import path from "path";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import styles from "./blog.module.css"; // Assuming you have a CSS module for styles

export default function Blogs() {
  const markdownFilePath = path.join(process.cwd(), "src", "app", "blogs", "how_to_do_great_work.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
  
  // Extract headings from markdown content
  const headings = [];
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;  // Number of # symbols
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    
    headings.push({ level, text, id });
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogContent}>
        {/* Main content with IDs for each heading */}
        <ReactMarkdown components={{
          h2: ({node, ...props}) => <h1 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} />,
          h3: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} />
        }}>
          {markdownContent}
        </ReactMarkdown>
      </div>
      
      {/* Navigation pane */}
      <div className={styles.navigationPane}>
        <nav>
          <ul>
            {headings.map((heading, index) => (
              <li 
                key={index} 
                className={`${styles.navItem} ${styles[`level-${heading.level}`]} ${heading.level === 1 ? styles.active : ''}`}
              >
                <a href={`#${heading.id}`}>
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}