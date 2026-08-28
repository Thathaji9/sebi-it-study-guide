import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="font-heading text-3xl">Page not on the desk</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        That route is not part of this prep app. Head back to the syllabus or a
        mock paper.
      </p>
      <Button className="mt-5" asChild>
        <Link href="/">Back to Grade A IT Desk</Link>
      </Button>
    </div>
  );
}
