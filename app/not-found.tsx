import "@/app/ui/not-found.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1>404 Error Page</h1>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link className={buttonVariants({ variant: "outline" })} href={"/"}>
            Back to Top
          </Link>
        </div>
      </div>
    </main>
  );
}
