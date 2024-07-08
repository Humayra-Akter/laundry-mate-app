import React from "react";
import { Redirect } from "expo-router";
import ProviderWrapper from "./ProviderWrapper";

const Index = () => {
  return (
    <ProviderWrapper>
      <Redirect href={"/(tabs)/home"} />
    </ProviderWrapper>
  );
};

export default Index;
