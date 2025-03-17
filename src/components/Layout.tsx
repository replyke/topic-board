import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NotificationsControl } from "./shared/NotificationsControl";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative container flex justify-between mx-auto px-4 pt-8 pb-2 max-w-5xl">
        <Link to="/" className="flex items-center gap-2 w-max">
          <img
            src="/favicon.png"
            alt="Replyke ForumHub"
            className="w-8 h-8 rounded-sm overflow-clip"
          />
          <span className="text-xl font-bold">Replyke ForumHub</span>
        </Link>
        <NotificationsControl />
      </header>
      <main className="mt-6 container px-4 mx-auto max-w-5xl flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 Replyke ForumHub. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:underline">
              Terms
            </Link>
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
