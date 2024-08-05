import React from "react";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/journal/${id}`);
    return data.journal;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/my-journals");
  }
};

const SingleJournal = () => {
  const data = useLoaderData();
  const { title, image, description, location, date } = data;
  const fixdate = day(date).format("YYYY-MM-DD");
  return (
    <Wrapper>
      <section className="single-journal">
        <div className="journal-info container">
          <h1>{title}</h1>
          <div className="info">
            <p className="icon-text">
              <span className="icon">
                <FaCalendar />
              </span>
              {fixdate}
            </p>
            <p className="icon-text">
              <span className="icon">
                <FaLocationDot />
              </span>
              {location}
            </p>
          </div>
        </div>
        <div className="journal-description">
          <img src={image} alt={location} />
          <p className="description">{description}</p>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h1 {
    margin-bottom: 1rem;
    font-size: clamp(1.5rem, 2.5rem, 3rem);
    text-align: center;
  }

  .icon {
    margin-right: 0.5rem;
  }
  .icon-text {
    margin-bottom: 0.5rem;
  }
  p {
    margin-right: 0.5rem;
  }
  img {
    object-fit: contain;
    width: 80%;
    border-radius: 20px;
    max-height: 700px;
  }
  .journal-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  .info {
    display: flex;
  }
  .journal-description {
    background-color: #f5f5dc;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .description {
    font-size: 1.5rem;
    width: 80%;
    margin: 1rem 0;
    font-family: "caveat";
    font-weight: 700;
    white-space: pre-line;
  }
  @media (max-width: 768px) {
    .journal-info {
      padding: 1rem 0;
    }
    .journal-description {
      padding: 1rem 0;
    }
    img {
      width: 90%;
    }
    .description {
      font-size: 1rem;
      width: 90%;
    }
  }
`;

export default SingleJournal;
