import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BlogHeader } from "./BlogHeader";
import { getPortfolioUrl } from "@/lib/urls";
export function BlogLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return (
    <div className="public-site">
      <a className="skip-link" href="#blog-main">
        Skip to writing
      </a>
      <BlogHeader />
      <main id="blog-main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="page-shell blog-footer">
        <span>© {new Date().getFullYear()} George Cavazos</span>
        <a className="text-link" href={getPortfolioUrl()}>
          Explore the portfolio
        </a>
      </footer>
    </div>
  );
}
