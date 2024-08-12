'use client'

import React from "react";
import styled from "styled-components";
import Scene from "@/components/scene";
import MODELS_OBJECT from "@/config/models";
import Info from "@/components/info";

const CanvasContainer = styled.div`
  width: 100vw;
  overflow-y: scroll;
  background: #000000;
  scroll-behavior: smooth;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

const FlexItem = styled.div`
  position: relative;
  background: #000000;
  width: 25vw;
  height: 50vh;
  cursor: pointer;
  border: 1px solid #196d06;
  @media (max-width: 600px) {
    width: 50vw;
    height: 25vh;
  }
`;

const Text = styled.p`
    font-family: "Courier";
    font-size: 20px;
    background: none;
    border: none;
    color: #196d06;
    text-transform: uppercase;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 14px;
    }
  `;

const CopyrightText = styled.p`
    font-family: "Courier";
    font-size: 14px;
    background: none;
    border: none;
    color: #196d06;
    text-transform: uppercase;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 12px;
    }
  `;

function IxyzwPage() {
  return (
    <>
      {/* <CustomHead title="I = x, y, z, w; 🟰 @ekezia" /> */}
      <CanvasContainer>
        {/* <Suspense fallback={<HtmlLoader />}> */}
        <FlexContainer>
          {Object.keys(MODELS_OBJECT).map((key, _) => (
            <FlexItem key={key}>
              <Info
                name={MODELS_OBJECT[key].name}
                date={MODELS_OBJECT[key].date}
              />
              <Scene modelKey={key} />
            </FlexItem>
          ))}
        </FlexContainer>
        <div style={{ height: '100px', width: '100vw', padding: '8px' }}>
          <Text>I = x, y, w, z;</Text>
          <Text>What is an “I”?
            An “I” is comprised of the unconscious and the conscious, and the abstract, liminal space in between both.
            <br /><br />
            Here lies the “I” diagrams of eight PolyU 2023’s Fashion MA graduates. The I itself, is structured around the axis of x, y, z, forming a three-dimensional cube that encapsulates the perpetually transforming human models.
            <br /><br />
            Time is crucial to a process. <br />
            Process is crucial to a concept.<br />
            These design works derive from concept. The concept were born as the designers too were born as human beings, and it takes time to grow to be their very existence presently. For the viewer to be able to see this presently concept — that is the final work for their MA collection — they must oblige to wait as long as the time specified by the designer. Thhese slow process demand viewers to accept another axis - w, the time.
            <br /><br />
            Along this progress of time, the cube synchronously reduces its transparency, enabling viewers to catch a glimpse of the human model inside. These human models morph back and forth from the bodies of the designers to their design works.
            <br /><br />
            On the cube, an image constantly evolves to another. The images grant us a brief access to each designer’s daily life, but also slowly revealing their abstract unconscious, similar to the points within the transformation process, in which the image was still hardly defined. Same principles could be applied to the ever-changing human models: the shape and texture of the designer and the model being the tangible consciousness, while the abstract shapes occurring during the transformation being the unconscious.</Text>
          <br />
          <Text>Special thanks to Poly University of Hong Kong, PolyU MA Graduates 2023, Ryan Scott Houlton and Allison Liao.</Text>
          <br /><br />
          <CopyrightText>Copyright © 2023 Elizabeth Kezia Widjaja</CopyrightText>
        </div>
      </CanvasContainer>
      {/* </Suspense> */}
    </>
  );
}

export default IxyzwPage;
