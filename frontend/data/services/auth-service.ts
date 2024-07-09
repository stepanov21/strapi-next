"use server";

import { getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}
export async function registerNewUser(userData: RegisterUserProps) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/auth/local/register", baseUrl);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}
export async function loginUser(userData: {
  identifier: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/auth/local", baseUrl);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
  }
}
