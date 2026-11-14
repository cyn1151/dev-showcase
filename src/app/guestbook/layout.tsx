import { Suspense, type ReactNode } from "react";

export default function GuestbookLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <header>
        <h1>Guestbook layout</h1>
      </header>
      <Suspense fallback={'loding'}>
        <main>{children}</main>
      </Suspense>
    </section>
  );
}
