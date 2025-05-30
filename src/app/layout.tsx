import type { Metadata } from "next";
import { Suspense } from 'react';
import Loading from './loading';

import "./globals.scss";

export const metadata: Metadata = {
  title: "Threed",
  description: "기업/기술 블로그",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}