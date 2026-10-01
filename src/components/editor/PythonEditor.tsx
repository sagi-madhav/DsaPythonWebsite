"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

// Monaco Editor is client-only (accesses window, web workers)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface PythonEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

export function PythonEditor({
  value,
  onChange,
  height = "100%",
  readOnly = false,
}: PythonEditorProps) {
  const handleEditorChange = useCallback(
    (val: string | undefined) => {
      onChange(val ?? "");
    },
    [onChange]
  );

  return (
    <div className="relative w-full h-full bg-[#1e1e1e] overflow-hidden rounded-md border border-zinc-800">
      <Editor
        height={height}
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'Fira Code', 'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
          fontLigatures: true,
          lineNumbers: "on",
          lineDecorationsWidth: 6,
          lineNumbersMinChars: 3,
          tabSize: 4,
          insertSpaces: true,
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          cursorBlinking: "smooth",
          padding: { top: 12, bottom: 12 },
        }}
        loading={
          <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
            Loading Python Editor...
          </div>
        }
      />
    </div>
  );
}
