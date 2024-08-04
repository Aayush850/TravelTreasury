import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  try {
    const response = await customFetch.post("/journal", formData);
    toast.success("Journal created");
    return redirect("/my-journals");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateJournal = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="container">
        <h1>Create Journal</h1>
        <div className="form-container">
          <Form encType="multipart/form-data" method="post">
            <div className="form-content">
              <input type="text" placeholder="Title" name="title" required />
              <input
                type="text"
                placeholder="Location"
                name="location"
                required
              />
              <input type="date" name="date" required />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="fileInput"
                  id="file"
                  name="image"
                  required
                />
              </div>

              <textarea
                name="description"
                id="description"
                placeholder="Write your thoughts"
                className="description"
                required
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
    height: 500px;
    padding: 1rem;
  }
  .fileInput {
    border: 1px solid #000;
  }
  input {
    margin: 0.5rem 0;
    padding: 1rem;
    border: solid 1px #000;
  }
  .form-content {
    display: grid;
    grid-template-areas:
      "input input"
      "input input"
      "description description";
    grid-gap: 1rem;
  }

  .description {
    grid-area: description;
    border-radius: 10px;
    border: solid 1px #000;
  }

  input {
    border-radius: 10px;
    outline: none;
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
export default CreateJournal;
