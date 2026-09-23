import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ColorModeToggle } from "./ColorModeToggle";
const navigation = [
  ["Work", "projects"],
  ["Experience", "experience"],
  ["Writing", "writing"],
  ["About", "about"],
  ["Contact", "contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const destination = useRef<string | null>(null);
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a href="#top" className="wordmark">
          <span className="monogram" aria-hidden="true">
            gc.
          </span>
          <span>George Cavazos</span>
        </a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigation.map(([name, id]) => (
            <a key={id} href={`#${id}`}>
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ColorModeToggle />
          <div className="mobile-nav">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                onCloseAutoFocus={(event) => {
                  if (!destination.current) return;
                  event.preventDefault();
                  const section = document.getElementById(destination.current);
                  section?.setAttribute("tabindex", "-1");
                  section?.focus({ preventScroll: true });
                  destination.current = null;
                }}
              >
                <SheetHeader>
                  <SheetTitle>George Cavazos</SheetTitle>
                  <SheetDescription>
                    Explore the work and the thinking behind it.
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="sheet-nav">
                  {navigation.map(([name, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => {
                        destination.current = id;
                        setOpen(false);
                      }}
                    >
                      {name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
