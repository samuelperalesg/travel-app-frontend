import { useState, useEffect, useCallback } from "react";
import {
  fetchLocations,
  createLocation,
  deleteLocation,
  fetchToken,
} from "./apiHelpers";

function useLocations(user, reloadTrigger) {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadLocations = useCallback(async () => {
    setLoading(true);
    
    if (!user) {
      // Fetch from session storage if user is not authenticated
      const sessionLocations = JSON.parse(sessionStorage.getItem("locations") || "[]");
      setLocations(sessionLocations);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const token = await fetchToken(user);
      const fetchedLocations = await fetchLocations(token);

      if (Array.isArray(fetchedLocations)) {
        setLocations(fetchedLocations);
      } else {
        console.error("Fetched locations is not an array.");
        setLocations([]);
      }
    } catch (err) {
      console.error("Error fetching locations:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addLocation = useCallback(
    async (location) => {
      try {
        const savedLocation = await createLocation(location, user);
        setLocations((prevLocations) =>
          Array.isArray(prevLocations)
            ? [...prevLocations, savedLocation]
            : [savedLocation]
        );

        return savedLocation;
      } catch (err) {
        setError(err.message);
      }
    },
    [user]
  );

  const removeLocation = useCallback(
    async (id) => {
      try {
        await deleteLocation(id, user);

        setLocations((prevLocations) => {
          const updatedLocations = prevLocations.filter(
            (loc) => loc && loc._id && loc._id !== id
          );

          return updatedLocations;
        });
      } catch (err) {
        setError(err.message);
      }
    },
    [user]
  );

  useEffect(() => {
    loadLocations();
  }, [loadLocations, reloadTrigger]);

  return {
    locations,
    addLocation,
    removeLocation,
    reloadLocations: loadLocations,
    error,
    setError,
    loading,
    setLoading,
  };
}

export default useLocations;
