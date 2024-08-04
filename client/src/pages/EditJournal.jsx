import React from "react";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import day from "dayjs";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/journal/${id}`);
    return data.journal;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return redirect("/my-journals");
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  try {
    const response = await customFetch.patch(`/journal/${id}`, formData);
    toast.success("Journal edited");
    return redirect("/my-journals");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJournal = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const journal = useLoaderData();
  const { title, location, date, description } = journal;
  const fixDate = day(date).format("YYYY-MM-DD");
  return (
    <Wrapper>
      <div className="container">
        <h1>Edit Journal</h1>
        <div className="form-container">
          <Form encType="multipart/form-data" method="post">
            <div className="form-content">
              <input
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={title}
                required
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                defaultValue={location}
                required
              />
              <input type="date" name="date" defaultValue={fixDate} required />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="fileInput"
                  id="file"
                  name="image"
                />
              </div>

              <textarea
                name="description"
                id="description"
                placeholder="Write your thoughts"
                className="description"
                required
                defaultValue={description}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    padding: 1rem 0;
  }
  .form-container {
    padding: 1rem;
  }
  h1 {
    text-align: center;
  }
  .description {
    width: 100%;
    height: 300px;
    padding: 1rem;
    grid-area: description;
  }
  .fileInput {
    border: 1px solid #000;
  }
  input {
    margin: 0.5rem 0;
    padding: 1rem;
  }
  .form-content {
    display: grid;
    grid-template-areas:
      "input input"
      "input input"
      "description description";
    grid-gap: 1rem;
  }

  @media (max-width: 768px) {
    .form-content {
      display: block;
    }
    .submit-btn {
      width: 100%;
    }
  }
`;
export default EditJournal;
