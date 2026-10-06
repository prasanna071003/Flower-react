import { apiRequest } from "./api";
import { normalizeFlowerImage } from "../utils/flowerImages";

function normalizeFlower(flower) {
  return { ...flower, image: normalizeFlowerImage(flower.image) };
}

export async function fetchFlowers(params = {}) {
  const query = new URLSearchParams();
  const { search, category, sort, featured, limit } = params;

  if (search) query.set("search", search);
  if (category && category !== "all") query.set("category", category);
  if (sort) query.set("sort", sort);
  if (featured !== undefined) query.set("featured", String(featured));
  if (limit !== undefined) query.set("limit", String(limit));

  const qs = query.toString();
  const payload = await apiRequest(`/flowers${qs ? `?${qs}` : ""}`, { auth: false });
  const data = (payload && payload.data) || { flowers: [], count: 0 };
  return {
    ...data,
    flowers: Array.isArray(data.flowers) ? data.flowers.map(normalizeFlower) : [],
  };
}

export async function fetchFlowerById(id) {
  const payload = await apiRequest(`/flowers/${id}`, { auth: false });
  const flower = payload && payload.data && payload.data.flower;
  return flower ? normalizeFlower(flower) : null;
}

export async function createFlower(flower) {
  const payload = await apiRequest("/flowers", { method: "POST", body: flower });
  return normalizeFlower(payload.data.flower);
}

export async function updateFlower(id, updates) {
  const payload = await apiRequest(`/flowers/${id}`, { method: "PUT", body: updates });
  return normalizeFlower(payload.data.flower);
}

export async function deleteFlower(id) {
  return apiRequest(`/flowers/${id}`, { method: "DELETE" });
}
