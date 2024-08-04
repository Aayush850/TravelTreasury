import React from "react";
import styled from "styled-components";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
day.extend(advancedFormat);

const JournalCard = ({ title, location, image, description, date, _id }) => {
  const fixdate = day(date).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <div className="journal-card">
        <img src={image} alt={location} className="card-img" />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <div className="card-info">
            <p>
              <span className="icon">
                <FaCalendar />
              </span>
              {fixdate}
            </p>
            <p>
              <span className="icon">
                <FaLocationDot />
              </span>
              {location}
            </p>
          </div>
          <p>
            {description.substring(0, 100)}....
            <Link className="secondary-btn" to={`/my-journals/${_id}`}>
              read more
            </Link>
          </p>
          <div className="buttons">
            <Link className="action-btn edit" to={`/my-journals/edit/${_id}`}>
              Edit
            </Link>
            <Link
              className="action-btn delete"
              to={`/my-journals/delete/${_id}`}
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .journal-card {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 10px;
  }
  .card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
  }
  img {
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  .card-content {
    padding: 1rem;
  }

  .icon {
    margin-right: 0.2rem;
  }
  .buttons {
    margin: 1rem 0;
  }

  .action-btn {
    margin-right: 0.5rem;
    color: #fff;
    padding: 0.4em 0.8em;
    border-radius: 4px;
    background-color: #3c5cff;
  }

  .secondary-btn {
    color: #22ac18;
  }

  @media (max-width: 768px) {
    .card-info {
      display: block;
      margin-bottom: 0.5rem;
    }
  }
`;

export default JournalCard;
