import React from "react";
import Info from "@/components/info";
import Scene from "@/components/scene";
import MODELS_OBJECT from "@/config/models";

export async function generateMetadata({ params }) {
  const { modelId } = params; // Extract the slug parameter

  return {
    title: `I = ${MODELS_OBJECT[modelId].name};`,
  };
}

function Model({ params }) {
  let id = params?.modelId;

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Info
        name={MODELS_OBJECT[id].name}
        date={MODELS_OBJECT[id].date}
        normalTextSize
      />
      <Scene modelKey={MODELS_OBJECT[id].name} showBox />
    </div>
  );
}

export default Model;
