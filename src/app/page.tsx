import Image from "next/image";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";

export default function Home() {
  return (
    <div id="root">
      <Link href="/blogs">
        <button>Go to Blogss</button>
      </Link>
    </div>
  );
}
