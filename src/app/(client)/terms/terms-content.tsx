import { TermsSections1To13 } from "./terms-sections-1-13";
import { TermsSections14To26 } from "./terms-sections-14-26";

export function TermsContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-8">
      <TermsSections1To13 />
      <TermsSections14To26 />
    </div>
  );
}
