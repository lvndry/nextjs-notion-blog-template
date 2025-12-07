interface DebugInfoProps {
  data: unknown;
  label: string;
}

export default function DebugInfo({ data, label }: DebugInfoProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
        Debug: {label}
      </h4>
      <pre className="text-xs text-yellow-700 dark:text-yellow-300 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
