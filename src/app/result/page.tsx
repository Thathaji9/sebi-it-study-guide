import { ResultView } from "@/components/result-view";

export default function ResultPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-3xl">Paper review</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Score is compared with the paper’s cut-off. Wrong answers already
          include the −¼ penalty in the total.
        </p>
      </header>
      <ResultView />
    </div>
  );
}
