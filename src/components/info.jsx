'use client'

import Link from "next/link";
import React from "react";
import styled from "styled-components";
import useTimer from "./timer";

const Button = styled.button`
cursor: pointer;
width: fit-content;
background: none;
border: none;
&:hover {
  border: 1px solid #196d06;
}
`;
const Title = styled.p`
font-family: "Courier";
font-size: ${({ $normalTextSize }) => $normalTextSize ? '20px' : '16px'};
background: none;
border: none;
color: #196d06;
text-transform: uppercase;
line-height: 1.2;
@media (max-width: 600px) {
  font-size: ${({ $normalTextSize }) => $normalTextSize ? '16px' : '12px'};
}
`;
const Text = styled.p`
font-family: "Courier";
font-size: ${({ $normalTextSize }) => $normalTextSize ? '16px' : '12px'};
background: none;
border: none;
color: #196d06;
text-transform: uppercase;
line-height: 1.2;
@media (max-width: 600px) {
  font-size: ${({ $normalTextSize }) => $normalTextSize ? '12px' : '8px'};
}
`;

function Info({ name, date, timerIsEnded = false, normalTextSize = false }) {
  const { time, progress } = useTimer(date);

  return (
    <div
      style={{
        zIndex: 10,
        width: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      <Link href={`/${name}`} target="_blank">
        <Button>
          <Title $normalTextSize={normalTextSize}>I = {name}</Title>
        </Button>
      </Link>
      <div style={{ padding: '8px' }}>
        <Text $normalTextSize={normalTextSize}>
          Estimated Reveal Time
          <br />
          {date}
        </Text>
        <Text>
          Revealed on {date}
        </Text>
        {!timerIsEnded ? (
          <Text>
            Revealing in...
            <br />
            {time.days}d&nbsp;
            {time.hours}h&nbsp;
            {time.minutes}m&nbsp;
            {time.seconds}s&nbsp;
            <br />
            {progress}% &nbsp;
          </Text>

        ) : (
          <Text $normalTextSize={normalTextSize}>D 0&nbsp; H 0&nbsp; M 0&nbsp; S 0&nbsp;</Text>
        )}
      </div>
    </div>
  );
}

export default Info;
