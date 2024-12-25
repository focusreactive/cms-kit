"use client";

import { useEffect } from "react";
import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "next-sanity";

import { client } from "@/lib/api/client";

// Always enable stega in Live Mode
const stegaClient = client.withConfig({ stega: true });

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient });
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL === "1" && window === parent) {
      location.href = "/api/disable-draft";
    }
  }, []);

  return <VisualEditing />;
}
