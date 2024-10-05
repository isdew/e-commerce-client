// api.js
export const fetchUserData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const fetchSortedProducts = async (order) => {
  const url = `http://127.0.0.1:8000/sort/byPrice${
    order === "ascending" ? "ToHigh" : "ToLow"
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sorted products (${order}).`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for the caller to handle
  }
};