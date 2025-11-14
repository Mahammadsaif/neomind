import "../styles/globals.css";

export const metadata = {
  title: "NeoMind",
  description: "NeoMind MVP Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}