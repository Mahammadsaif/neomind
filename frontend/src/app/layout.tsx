import "./globals.css";
import "./(landing)/styles.css";

export const metadata = {
  title: "NeoMind",
  description: "NeoMind AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}