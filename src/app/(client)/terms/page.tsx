import { TermsContent } from "./terms-content";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        Terms &amp; Conditions
      </h1>
      <TermsContent />
    </div>
  );
}
