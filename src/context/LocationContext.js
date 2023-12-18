import React, { useContext, useReducer, useEffect } from "react";
import useLocations from "../helpers/useLocations";
import { fetchLocation } from "../helpers/fetchLocation";

const LocationContext = React.createContext({

  state: {
    locations: [],
    loading: true,
    error: null,
    defaultLocation: {
      imageUrl: "",
      name: "",
    },
  },
  actions: {
    addLocation: () => {},
    removeLocation: () => {},
    reloadLocations: () => {},
    setLocations: () => {},
    setDefaultLocation: () => {},
  },
});

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_DEFAULT_LOCATION":
      return { ...state, defaultLocation: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const LocationProvider = ({ user, defaultImageUrl, children }) => {
  const [state, dispatch] = useReducer(locationReducer, {
    locations: [],
    loading: true,
    error: null,
  });

  const { locations, addLocation, removeLocation, reloadLocations } =
    useLocations(user);

  useEffect(() => {
    const fetchAndSetDefaultLocation = async () => {
      const fetchedLocation = await fetchLocation();
      dispatch({ type: "SET_DEFAULT_LOCATION", payload: fetchedLocation });
    };

    fetchAndSetDefaultLocation();

    if (defaultImageUrl) {
      dispatch({
        type: "SET_DEFAULT_LOCATION",
        payload: { imageUrl: defaultImageUrl },
      });
    }
    if (!user) {
      const sessionLocations = JSON.parse(
        sessionStorage.getItem("locations") || "[]"
      );
      dispatch({ type: "SET_LOCATIONS", payload: sessionLocations });
    } else {
      dispatch({ type: "SET_LOCATIONS", payload: locations || [] });
    }
  }, [locations, user, defaultImageUrl]);

  const value = {
    state: state,
    actions: {
      addLocation,
      removeLocation,
      reloadLocations,
      setLocations: (locs) =>
        dispatch({ type: "SET_LOCATIONS", payload: locs }),
      setDefaultLocation: (location) =>
        dispatch({ type: "SET_DEFAULT_LOCATION", payload: location }),
    },
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
