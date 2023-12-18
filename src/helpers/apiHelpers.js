const URL = process.env.REACT_APP_URL;

export const fetchToken = async (user) => {
  if (!user) throw new Error("User is not authenticated");

  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const fetchLocations = async (token) => {
  if (!token) {
    
  }

  let response;
  try {
    response = await fetch(`${URL}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Network error when fetching locations:", error);
    throw error;
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      "Error fetching locations:",
      errorData,
      "Status:",
      response.status
    );
    throw new Error(errorData.error || "Failed to fetch locations");
  }

  const locations = await response.json();

  if (!locations || !Array.isArray(locations)) {
    console.warn("API did not return a valid locations array.");
    return [];
  }
  return locations;
};

export const createLocation = async (location, user) => {
  if (!user) {
    const currentLocations = JSON.parse(
      sessionStorage.getItem("locations") || "[]"
    );
    location._id = `temp-${Date.now()}`; // Generate a temporary unique identifier
    currentLocations.push(location);
    sessionStorage.setItem("locations", JSON.stringify(currentLocations));
    console.warn("User not authenticated. Location saved to session storage.");
    return;
  }

  const token = await fetchToken(user);

  let response;
  try {
    response = await fetch(`${URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(location),
    });
  } catch (error) {
    console.error("Network error when creating location:", error);
    throw error;
  }

  if (!response.ok) {
    console.error("Error creating location. Status:", response.status);
    throw new Error("Failed to create location");
  }

  const responseData = await response.json();
  return responseData;
};

export const deleteLocation = async (id, user) => {
  const token = await fetchToken(user);
  let response;
  try {
    response = await fetch(`${URL}/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Network error when deleting location:", error);
    throw error;
  }

  if (response.status === 403) {
    alert("You do not have permission to delete this location.");
    return;
  }

  if (!response.ok) {
    console.error("Error deleting location. Status:", response.status);
    throw new Error("Failed to delete location");
  }
};
