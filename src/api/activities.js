import { fetchApi } from "../utilities/fetchApi";

export const getAllActivities = async () => await fetchApi("GET", "activities");

export const getActivityDetails = async (id) =>
  await fetchApi("GET", `activities/${id}`);

export const updateActivity = async (id, isArchived) => {
  const body = {
    is_archived: isArchived,
  };
  await fetchApi("POST", `activities/${id}`, JSON.stringify(body));
};

export const resetActivity = async () => await fetchApi("GET", `reset`);
