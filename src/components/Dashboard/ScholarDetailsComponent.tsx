import React, { useEffect, useState } from "react";
import LoadingOverlay from "../Loader/LoadingOverlay";

interface Props {}

export const ScholarDetailsComponent = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log({ props });

  useEffect(() => {
    setIsLoading(false);
    // return () => {
    //   cleanup;
    // };
  }, []);
  if (isLoading) <LoadingOverlay />;
  return <div>hello</div>;
};
