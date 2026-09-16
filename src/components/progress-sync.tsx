"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { exportProgressJson, importProgressJson } from "@/lib/progress";

export function ProgressSync({
  onImported,
}: {
  onImported?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paste, setPaste] = useState("");

  const report = (ok: string | null, fail: string | null) => {
    setMessage(ok);
    setError(fail);
  };

  const download = () => {
    const json = exportProgressJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grade-a-it-desk-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    report("Downloaded a progress file. Open it on your other device and import.", null);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exportProgressJson());
      report("Copied. Paste this on your phone or laptop under Import.", null);
    } catch {
      report(null, "Clipboard is blocked in this browser. Download the file instead.");
    }
  };

  const apply = (raw: string) => {
    try {
      importProgressJson(raw);
      setPaste("");
      report(
        "Imported. This device now has the combined progress (latest answer per question wins).",
        null,
      );
      onImported?.();
    } catch {
      report(null, "That file or text is not a Grade A IT Desk progress export.");
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    apply(await file.text());
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-5">
      <h2 className="font-heading text-lg">Same progress on phone and laptop</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        There is no login. Export on one device, then import on the other. Import
        merges with what is already here — it does not wipe the other device’s
        work unless you reset first.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={download}>
          Export file
        </Button>
        <Button type="button" variant="outline" onClick={copy}>
          Copy progress
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}
        >
          Import file
        </Button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json,text/plain"
        className="hidden"
        onChange={(event) => onFile(event.target.files?.[0])}
      />
      <label className="mt-3 block text-xs text-muted-foreground">
        Or paste exported text
        <textarea
          className="mt-1 min-h-20 w-full rounded-lg border bg-background px-3 py-2 font-mono text-xs"
          value={paste}
          onChange={(event) => setPaste(event.target.value)}
          placeholder='{"attempts":...,"bookmarks":[],"mocks":[]}'
        />
      </label>
      {paste.trim() ? (
        <Button className="mt-2" type="button" onClick={() => apply(paste)}>
          Import pasted progress
        </Button>
      ) : null}
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
      {error ? (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
