import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Footer from "components/Footer";
import Header from "components/Header";

import "styles/global.scss";

import Providers from "providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Destyno",
  description:
    "Destyno é o seu portal de turismo, projetado para ajudá-lo a explorar o mundo de maneira única e memorável",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
