"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";

import { getClientSideURL } from "@/lib/utilities/getURL";

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={getClientSideURL()}
    />
  );
};
