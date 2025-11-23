import { Reflection, NewReflection } from "../types/reflection";
import { VerseApiResponse } from "../types/verseResponse";

const verseURL = "https://beta.ourmanna.com/api/v1/get?format=json&order=daily";
const baseUrl = import.meta.env.VITE_API_URL;

console.log(verseURL, "from reflection service");

const fetchJson = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

const ReflectionService = {
  // todo create reflection
  getVerseOfTheDay: async () => {
    const response = await fetch(`${verseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`VOD API error:  ${response}`);
    }

    const data: VerseApiResponse = await response.json();
    return data;
  },

  createReflection: async (data: NewReflection, token: String) => {
    return fetchJson<Reflection>("/reflections", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  getReflections: async () => {
    const data = await fetchJson<Reflection[]>("/reflections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  },

  deleteReflection: async (id: number, token: String): Promise<void> => {
    const res = await fetch(`${baseUrl}/reflections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  },

  // todo get reflection
};

export default ReflectionService;
