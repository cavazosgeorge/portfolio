import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import { ColorModeToggle } from "@/components/layout/ColorModeToggle";
import { Button } from "@/components/ui/button";
import { getPortfolioUrl } from "@/lib/urls";
export function BlogHeader() {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link to="/" className="wordmark">
          <span className="monogram" aria-hidden="true">
            gc.
          </span>
          <span>
            George Cavazos <span className="wordmark-subtitle">Writing</span>
          </span>
        </Link>
        <nav aria-label="Blog navigation" className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <a href={getPortfolioUrl()}>
              <ArrowUpLeft data-icon="inline-start" aria-hidden="true" />
              Portfolio
            </a>
          </Button>
          <ColorModeToggle />
        </nav>
      </div>
    </header>
  );
}
