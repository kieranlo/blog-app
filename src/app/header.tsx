import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          About
        </Link>
        <Link href="/blogs">
          Blogs
        </Link>
      </nav>
    </header>
  );
}