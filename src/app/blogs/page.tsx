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
  
  // Create a Date object for sorting
  let dateObj = new Date(0); // Default to epoch
  if (date !== 'No date') {
    try {
      dateObj = new Date(date);
      console.log(`${title}: Parsed date: ${dateObj.toISOString()}`);
    } catch (e) {
      console.error(`Error ${e}, Could not parse date: ${date}, ${dateObj}`);
    }
  }
  
  return { title, date, dateObj };
}

export default function BlogIndex() {
  // Get all markdown files from the content directory
  const contentDir = path.join(process.cwd(), 'src', 'app', 'blogs', 'content');
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  // Extract blog metadata for each file
  const blogs = files.map(file => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { title, date, dateObj } = extractMetadata(content);
    const slug = file.replace('.md', '');
    
    return {
      slug,
      title,
      date,
      dateObj
    };
  });
  
  // Sort blogs by date in descending order (newest first)
  blogs.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className={styles.blogCard}>
            <div>
                <Link href={`/blogs/${blog.slug}`}>
                    <h2>{blog.title}</h2>
                </Link>
                <p>{blog.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}