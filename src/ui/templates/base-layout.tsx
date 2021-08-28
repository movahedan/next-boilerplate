import Link from "next/link";

import type { FC } from "react";

export const GBaseLayout: FC = ({ children }) => (
  <>
    <nav>
      <Link href="/">
        <a>Go to home</a>
      </Link>
      <Link href="/redux-sample">
        <a>Go to /redux-sample</a>
      </Link>
      <Link href="/redux-sample/server-side-props">
        <a>Go to /redux-sample/server-side-props</a>
      </Link>
    </nav>
    {children}

    <style jsx global>{`
      *:not(i) {
        font-family: Inter sans-serif;
      }

      #__next {
        @apply relative flex flex-col min-h-screen m-0 overflow-hidden text-base max-w-screen;

        padding: env(safe-area-inset-top) env(safe-area-inset-right)
          env(safe-area-inset-bottom) env(safe-area-inset-left);
      }
    `}</style>

    <style jsx>{`
      nav {
        @apply p-3 text-white bg-black;

        a {
          @apply p-3 mr-6;
        }
      }
    `}</style>
  </>
);
