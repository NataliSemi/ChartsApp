// components/FondyRedirectForm.tsx
"use client";

import { useEffect, useRef } from "react";

type FondyRedirectFormProps = {
  params: Record<string, string>;
};

export default function FondyRedirectForm({ params }: FondyRedirectFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, []);

  return (
    <form
      ref={formRef}
      method="POST"
      action="https://pay.fondy.eu/api/checkout/redirect/"
    >
      {Object.entries(params).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <noscript>
        <button type="submit">Continue to Payment</button>
      </noscript>
    </form>
  );
}
