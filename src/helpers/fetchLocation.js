const URL = process.env.REACT_APP_URL;

// export const fetchLocation = () => {
//   return {
//     imageUrl: "https://wallpapers.com/images/hd/beautiful-view-32hhlcdpg0anl9wm.jpg",
//     name: "Mysterious Destination",
//   };
// };

export const fetchLocation = async () => {
  console.log("Fetching location with URL:", URL);
  
  try {
    const response = await fetch(`${URL}/api/unsplash/random`);
    console.log("Received response from API:", response);

    if (!response.ok) {
      console.error("Failed to fetch from backend. Status:", response.status);
      throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    console.log("Received data from API:", data);

    let imageUrl, locationName;

    if (Array.isArray(data) && data[0]) {
      imageUrl = data[0].urls?.regular;
      locationName = data[0].location.name || data[0].location?.name || "Mysterious Destination";
    } else {
      imageUrl = data.urls?.regular;
      locationName = data.description || data.location?.name || "Mysterious Destination";
    }

    console.log("Processed image URL and location name:", imageUrl, locationName);

    if (imageUrl && locationName) {
      return {
        imageUrl,
        name: locationName,
      };
    } else {
      console.error("Unexpected data structure:", data);
      throw new Error("Unexpected data structure from API");
    }
  } catch (error) {
    console.error("Failed to fetch recommendation:", error);
    throw error;
  }
};
