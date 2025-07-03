import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from './blog.module.css';

// Helper function to extract metadata from markdown content
function extractMetadata(content: string) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  
  const dateMatch = content.match(/Date:\s*(.+)$/m);
  const date = dateMatch ? dateMatch[1] : 'No date';
  
  return { title, date };
}

export default function BlogIndex() {
  // Get all markdown files from the content directory
  const contentDir = path.join(process.cwd(), 'src', 'app', 'blogs', 'content');
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  // Extract blog metadata for each file
  const blogs = files.map(file => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { title, date } = extractMetadata(content);
    const slug = file.replace('.md', '');
    
    return {
      slug,
      title,
      date
    };
  });
  
  return (
    <div className={styles.blogListContainer}>
      <h1>Blog Posts</h1>
      <ul className={styles.blogList}>
        {blogs.map((blog, index) => (
          <li key={index} className={styles.blogItem}>
            <Link href={`/blogs/${blog.slug}`}>
              <div className={styles.blogCard}>
                <h2>{blog.title}</h2>
                <p className={styles.blogDate}>{blog.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}