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
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/components?${searchParams}`,
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

  const { parentStories, childStories, globalComponents } = stories.reduce(
    (acc, story) => {
      if (story.is_folder) {
        acc.parentStories.push(story);
      } else {
        if (globalComponentNames.includes(story.content.component)) {
          acc.globalComponents.push(story);
        } else {
          acc.childStories.push(story);
        }
      }

      return acc;
    },
    { parentStories: [], childStories: [], globalComponents: [] },
  );

  // Map to track old ID to new ID relationships
  const idMap = new Map();

  // Create all parent stories first
  for (const story of parentStories) {
    try {
      const newStory = await createStory(spaceId, story);
      idMap.set(story.id, newStory.story.id);
    } catch (error) {
      console.error(`Failed to create parent story: ${error.message}`);
      throw error;
    }
  }

  // Create global components
  let headerUuid = null;
  let footerUuid = null;

  for (const story of globalComponents) {
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
  for (const story of childStories) {
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

export async function getStoryBySlug(spaceId, slug) {
  const envs = loadEnvVariables();
  const token = envs.SB_PERSONAL_ACCESS_TOKEN;

  const searchParams = new URLSearchParams({
    version: "draft",
    by_slugs: slug, // home, headers/default-header
  });

  const response = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories?${searchParams}`,
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
