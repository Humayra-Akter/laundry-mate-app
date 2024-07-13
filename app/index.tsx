// //app/index.tsx
// import React from "react";
// import { Redirect } from "expo-router";

// const index = () => {
//   return <Redirect href="/(authenticate)/login" />;
// };

// export default index;
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Redirect href="/(authenticate)/login" />;
};

export default Index;
