import path from "path";
import fs from "fs";
import ReactMarkdown from "react-markdown";

export default function Blogs() {

  const markdownFilePath = path.join(process.cwd(), "src", "app", "blogs", "how_to_do_great_work.md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");

  return (
    <div>
      <h1>Blogs Page</h1>
      <p>Welcome to the blogs page!!</p>
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
    </div>
  );
}