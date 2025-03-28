import React from "react";
import styled from "styled-components";

export const Title = () => {
  return (
    <StyledWrapper>
      <div className="button-icon">
        <div className="cube">
          <span className="side front">Virtual Travel</span>
          <span className="side top">By Niraj</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Styled Component
const StyledWrapper = styled.div`
  .button-icon {
    display: flex;
    width: fit-content;
    height: 50px;
    cursor: pointer;
    position: relative;
    font-family: "Delicious Handrawn", serif;
    font-weight: 400;
    font-style: normal;
  }
  .cube {
    transition: all 0.4s;
    transform-style: preserve-3d;
    width: 200px;
    height: 20px;
    position: relative;
  }

  .button-icon:hover {
    background: linear-gradient(to right, #F6E5EF 25%, #F8EEE6);
  }

  .button-icon:hover .cube {
    transform: rotateX(90deg);
  }

  .side {
    position: absolute;
    height: 47px;
    width: 200px;
    display: flex;
    font-size: 0.8em;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
  }

  .top {
    background: linear-gradient(to right, #F6E5EF 25%, #F8EEE6);
    color: rgb(0, 0, 0);
    transform: rotateX(-90deg) translate3d(0, 13.5px, 2em);
  }

  .front {
    background: linear-gradient(to right, #F6E5EF 25%, #F8EEE6);
    color: rgb(0, 0, 0);
    transform: translate3d(0, 0, 1em);
  }
`;

