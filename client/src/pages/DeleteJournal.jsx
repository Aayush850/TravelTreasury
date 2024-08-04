import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  const { id } = params;
  console.log(id);

  try {
    await customFetch.delete(`/journal/${id}`);
    toast.success("Journal deleted");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/my-journals");
};
