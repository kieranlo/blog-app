import Image from "next/image";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";

export default function Home() {

  const markdownFilePath = path.join(process.cwd(), "src", "app", "blogs", "how_to_do_great_work.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
  
  return (
    <>
      <Link href="/blogs">
        <button>Go to Blogss</button>
      </Link>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </>
    
  );
}
