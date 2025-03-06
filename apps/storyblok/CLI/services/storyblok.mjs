import { readdir, readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { loadEnvVariables } from "../utils/envs.mjs";

export async function createStoryblokSpace(name) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch("https://mapi.storyblok.com/v1/spaces/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ space: { name } }),
  });

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return {
    spaceId: data.space.id,
    previewToken: data.space.first_token,
    data: data,
  };
}

export async function updateStoryblokSpace(spaceId, spaceData) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://api.storyblok.com/v1/spaces/${spaceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ space: spaceData }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }
}

export async function createStoryblokWebhook(spaceId, endpoint) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://api.storyblok.com/v1/spaces/${spaceId}/webhook_endpoints/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        webhook_endpoint: {
          name: "Revalidate",
          endpoint,
          actions: [
            "story.published",
            "story.unpublished",
            "story.deleted",
            "story.moved",
            "datasource.entries_updated",
          ],
          activated: true,
        },
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }
}

export async function updatePageComponentSectionsField(spaceId) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const pageComponent = await getPageComponent(spaceId);
  const sectionsFolder = await getSectionsFolder(spaceId);

  if (!pageComponent) {
    throw new Error(`Page component "${pageName}" not found`);
  }

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/components/${pageComponent.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        component: {
          schema: {
            ...pageComponent.schema,
            sections: {
              ...pageComponent.schema.sections,
              component_group_whitelist: [sectionsFolder.uuid],
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

async function getPageComponent(spaceId) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;
  const componentName = "page";

  const searchParams = new URLSearchParams({
    search: componentName,
  });

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/components?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const component = data.components.find((comp) => comp.name === componentName);

  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }

  return component;
}

async function getSectionsFolder(spaceId) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://api.storyblok.com/v1/spaces/${spaceId}/component_groups/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.component_groups.find((folder) => folder.name === "sections");
}

export async function getStoryBySlug(spaceId, slug) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const searchParams = new URLSearchParams({
    version: "draft",
    by_slugs: slug, // home, headers/default-header
  });

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.stories[0] || null;
}

async function createStory(spaceId, storyData) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        story: storyData,
        publish: 1,
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function updateStory(spaceId, storyId, storyData) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${storyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        story: storyData,
        publish: 1,
        force_update: 1,
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function createAccessToken(spaceId, access = "public") {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/api_keys/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        api_key: {
          access,
          name: `${access} access Token`,
        },
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

const globalComponentNames = ["header", "footer"];

export async function uploadBackupStories(spaceId) {
  // Get directory path relative to current file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const backupDir = join(__dirname, "../../src/generated/dump/backup/stories");

  // Read all story files from backup directory
  const storyFiles = await readdir(backupDir);
  const stories = await Promise.all(
    storyFiles
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const content = await readFile(join(backupDir, file), "utf8");
        return JSON.parse(content);
      }),
  );

  const { parentFoldersStories, pageStories, globalComponentsStories } =
    stories.reduce(
      (acc, story) => {
        if (story.is_folder) {
          acc.parentFoldersStories.push(story);
        } else {
          if (globalComponentNames.includes(story.content.component)) {
            acc.globalComponentsStories.push(story);
          } else {
            acc.pageStories.push(story);
          }
        }

        return acc;
      },
      {
        pageStories: [],
        parentFoldersStories: [],
        globalComponentsStories: [],
      },
    );

  // Map to track old ID to new ID relationships
  const idMap = new Map();

  // since all folders are inside components/ folder, it should be created first
  const sortedParentFoldersStories = parentFoldersStories.sort((a, b) => {
    if (a.slug === "components") return -1;
    if (b.slug === "components") return 1;

    return 0;
  });

  // Create all parent stories first
  for (const story of sortedParentFoldersStories) {
    try {
      const newParentId = idMap.get(story.parent_id) || null;

      const storyData = {
        ...story,
        content: story.content,
        parent_id: newParentId,
      };

      const newStory = await createStory(spaceId, storyData);
      idMap.set(story.id, newStory.story.id);
    } catch (error) {
      console.error(`Failed to create parent story: ${error.message}`);
      throw error;
    }
  }

  // Create global components
  let headerUuid = null;
  let footerUuid = null;

  for (const story of globalComponentsStories) {
    // Update the parent_id to use the new ID
    const newParentId = idMap.get(story.parent_id) || null;

    const storyData = {
      ...story,
      content: story.content,
      parent_id: newParentId,
    };

    const newGlobalComponent = await createStory(spaceId, storyData);

    if (story.content.component === "header") {
      headerUuid = newGlobalComponent.story.uuid;
    } else if (story.content.component === "footer") {
      footerUuid = newGlobalComponent.story.uuid;
    }
  }

  // Create child stories with updated parent IDs
  for (const story of pageStories) {
    try {
      // Update the parent_id to use the new ID
      const newParentId = idMap.get(story.parent_id) || null;

      const storyData = {
        ...story,
        content: {
          ...story.content,
          header: headerUuid,
          footer: footerUuid,
        },
        parent_id: newParentId,
      };

      if (story.slug === "home") {
        const homeStory = await getStoryBySlug(spaceId, "home");
        await updateStory(spaceId, homeStory.id, storyData);
      } else {
        await createStory(spaceId, storyData);
      }
    } catch (error) {
      console.error(`Failed to create child story: ${error.message}`);
      throw error;
    }
  }
}

export async function uploadBackupDatasources(spaceId) {
  // Get directory path relative to current file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const backupDir = join(
    __dirname,
    "../../src/generated/dump/backup/datasources",
  );

  // Read all datasource files from backup directory
  const datasourceFiles = await readdir(backupDir);
  const datasourceIds = datasourceFiles
    .filter((file) => file.endsWith(".json") && !file.includes("_entries"))
    .map((file) => file.replace(".json", ""));

  // Create each datasource
  for (const datasourceId of datasourceIds) {
    try {
      const envs = loadEnvVariables();
      const token = envs.SB_PERSONAL_ACCESS_TOKEN;

      // Get directory path relative to current file
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const backupDir = join(
        __dirname,
        "../../src/generated/dump/backup/datasources",
      );

      // Read datasource metadata file
      const datasourceFile = join(backupDir, `${datasourceId}.json`);
      const datasourceContent = await readFile(datasourceFile, "utf8");
      const datasourceData = JSON.parse(datasourceContent);

      // Create the datasource
      const response = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${spaceId}/datasources/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            datasource: {
              name: datasourceData.name,
              slug: datasourceData.slug,
              dimensions_attributes: datasourceData.dimensions.map((dim) => ({
                name: dim.name,
                entry_value: dim.entry_value,
              })),
            },
          }),
        },
      );

      if (!response.ok) {
        console.log(
          response.status,
          response.statusText,
          await response.json(),
        );
        throw new Error(`❌ HTTP error! Status: ${response.status}`);
      }

      const newDatasource = await response.json();

      // Read datasource entries file
      const entriesFile = join(backupDir, `${datasourceId}_entries.json`);
      const entriesContent = await readFile(entriesFile, "utf8");
      const entriesData = JSON.parse(entriesContent);

      // Create entries for the datasource
      for (const entry of entriesData) {
        const entryResponse = await fetch(
          `https://mapi.storyblok.com/v1/spaces/${spaceId}/datasource_entries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              datasource_entry: {
                name: entry.name,
                value: entry.value,
                dimension_value: entry.dimension_value || "",
                datasource_id: newDatasource.datasource.id,
              },
            }),
          },
        );

        if (!entryResponse.ok) {
          console.log(
            entryResponse.status,
            entryResponse.statusText,
            await entryResponse.json(),
          );
          throw new Error(
            `❌ HTTP error creating entry! Status: ${entryResponse.status}`,
          );
        }
      }
    } catch (error) {
      console.error(
        `❌ Failed to create datasource ${datasourceId}: ${error.message}`,
      );
    }
  }
}
