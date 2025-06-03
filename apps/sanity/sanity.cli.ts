import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "@/lib/config";

export default defineCliConfig({ api: { projectId, dataset } });
