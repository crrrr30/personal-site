import Link from "next/link";

export default function NavbarLinks() {
  return [
    <Link key={1} href="/" className="inverted-link">
      Home
    </Link>,
    <Link
      key={2}
      href="https://sites.psu.edu/jonathancui"
      className="inverted-link"
    >
      Blogs
    </Link>,
    <Link key={3} href="/assets/files/Resume.pdf" className="inverted-link">
      Résumé
    </Link>,
    <Link
      key={4}
      href="https://sway.office.com/qHuaPGQEKeIjePnJ"
      className="inverted-link"
    >
      Portfolio
    </Link>,
  ];
}
