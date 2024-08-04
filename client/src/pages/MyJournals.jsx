import React from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import JournalCard from "../components/JournalCard";

export const loader = async () => {
  try {
    const { data } = await customFetch("/journal");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const MyJournals = () => {
  const { journals } = useLoaderData();

  return (
    <Wrapper>
      <div className="container">
        <header>
          <h1>My Journals</h1>
        </header>

        {!journals || journals.length < 1 ? (
          <h2>You have not created any journals</h2>
        ) : (
          <div className="journals-container">
            {journals.map((journal) => {
              return <JournalCard {...journal} key={journal._id} />;
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .journals-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  header {
    margin: 1rem 0;
  }
  h1 {
    text-align: center;
  }
  h2 {
    text-align: center;
  }

  @media (max-width: 768px) {
    .journals-container {
      grid-template-columns: repeat(2, 1fr);
      margin: 1rem 0;
    }
  }

  @media (max-width: 500px) {
    .journals-container {
      grid-template-columns: 1fr;
      margin: 1rem 0;
    }
  }
`;

export default MyJournals;
