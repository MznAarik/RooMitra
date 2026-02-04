import api from "@/lib/api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const register = async () => {
  const res = await api.post("/register");
  return res.data;
};
