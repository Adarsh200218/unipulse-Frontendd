import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Footer Links */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            {/* <li>
              <Link href="/">Product Information</Link>
            </li> */}
            {/* <li>
              <Link href="/">Corporate Information</Link>
            </li> */}
            {/* <li>
              <Link href="/">Site Map</Link>
            </li> */}
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/term-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="color-green text-gray-300 text-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">

          <p>
            © {new Date().getFullYear()} UNIPULSE INSTRUMENTS. All Rights Reserved.

          </p>

          <p>
            Website Design by{" "}
            <a
              href="http://www.infiniteitsolutions.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Infinite IT Solutions
            </a>
          </p>
        </div>
      </div>
    </>

  );
}