export const metadata = {
  title: "Next pnpm source map repro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

