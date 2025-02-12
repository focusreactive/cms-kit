export async function fetchSanityOrganizations(token) {
  const url = "https://api.sanity.io/v2021-06-07/organizations";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No organizations found.");
    }

    const organizations = data.map((org) => ({
      name: org.name,
      slug: org.slug,
      id: org.id,
    }));

    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error.message);
    return [];
  }
}

export async function fetchSanityUserInfo(token) {
  const url = "https://api.sanity.io/v2021-06-07/users/me";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const userInfo = {
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
    };

    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return {};
  }
}
