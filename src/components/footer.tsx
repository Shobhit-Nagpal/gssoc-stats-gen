import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shobhit Nagpal. All rights
            reserved.
          </p>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
