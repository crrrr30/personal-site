import Link from "next/link";

export default function NavbarLinks() {
  return [
    <Link href="/" className="inverted-link">
      Home
    </Link>,
    <Link href="https://sites.psu.edu/jonathancui" className="inverted-link">
      Blogs
    </Link>,
    <Link href="/assets/files/Resume.pdf" className="inverted-link">
      Résumé
    </Link>,
    <Link
      href="https://sway.office.com/qHuaPGQEKeIjePnJ"
      className="inverted-link"
    >
      Portfolio
    </Link>,
  ];
}
