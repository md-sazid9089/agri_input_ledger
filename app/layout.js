import './globals.css';

export const metadata = {
  title: 'AgriInput Ledger - Verified Agricultural Inputs Catalog',
  description: 'A public catalog of verified agricultural inputs to reduce crop loss and improve yields. Supporting SDG 2: Zero Hunger.',
  keywords: 'agriculture, farming, seeds, fertilizer, pesticides, SDG 2, zero hunger, verified inputs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
