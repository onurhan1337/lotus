"use server";

import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Gets a user by their username.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the list of users.
 */
export async function getUserByName(username: string) {
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const user = await clerkClient.users.getUserList({
      username: [username],
    });

    return { user };
  } catch (err) {
    return { message: err };
  }
}

/**

 * @returns {Promise<number>} - A promise that resolves to an number containing the count of users.
 */
export async function getUsersCount() {
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const usersCount = await clerkClient.users.getCount();

    return { usersCount };
  } catch (err) {
    return { message: err };
  }
}

/**
 * Sets the role of a user.
 *
 * @param {FormData} formData - The form data containing the user ID and the role to be set.
 * @returns {Promise<Object>} - A promise that resolves to an object containing a message about the operation's result.
 *
 * @throws Will throw an error if the operation fails.
 */
export async function setRole(formData: FormData) {
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient.users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
