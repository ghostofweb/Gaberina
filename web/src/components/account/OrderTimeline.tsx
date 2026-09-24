const STEPS = ["Placed", "Packing", "Shipped", "Delivered"] as const;

/** Maps the admin's status values (including legacy spellings like "Order" and "Deliverd") to a step. */
export function stepIndex(status: string) {
  const s = status.toLowerCase();
  if (s.startsWith("deliver")) return 3;
  if (s.startsWith("ship") || s.includes("out for")) return 2;
  if (s.startsWith("pack")) return 1;
  return 0;
}

export const stepLabel = (status: string) => STEPS[stepIndex(status)];

export function OrderTimeline({ status }: { status: string }) {
  const current = stepIndex(status);
  return (
    <ol className="grid grid-cols-4" aria-label={`Status: ${STEPS[current]}`}>
      {STEPS.map((step, i) => {
        const reached = i <= current;
        return (
          <li key={step} className="relative flex flex-col gap-3" aria-current={i === current ? "step" : undefined}>
            <div className="flex items-center">
              <span
                className={`relative z-10 size-2.5 shrink-0 rounded-full border ${
                  i === current ? "border-champagne bg-champagne" : reached ? "border-ivory bg-ivory" : "border-ivory/30 bg-noir"
                }`}
              />
              {i < STEPS.length - 1 && (
                <span className="relative h-px flex-1 bg-ivory/15">
                  <span
                    className="absolute inset-y-0 left-0 bg-ivory transition-[width] duration-1000 ease-[var(--ease-luxe)]"
                    style={{ width: i < current ? "100%" : "0%" }}
                  />
                </span>
              )}
            </div>
            <span className={`label ${i === current ? "text-champagne" : reached ? "text-ivory" : "text-taupe"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
