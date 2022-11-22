import { fetchApi } from "../utilities/fetchApi";

export const getAllActivities = async () => await fetchApi("GET", "activities");

export const getActivityDetails = async (id) =>
  await fetchApi("GET", `activities/${id}`);

export const updateActivity = async (id, isArchived) =>
  await fetchApi("POST", `activities/${id}`, { is_archived: isArchived });

export const resetActivity = async () => await fetchApi("GET", `reset`);
