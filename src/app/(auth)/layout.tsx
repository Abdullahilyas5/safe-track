export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        {children}
        </div>
      </body>
    </html>
  );
}