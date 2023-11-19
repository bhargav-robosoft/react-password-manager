import React, { useEffect, useState } from "react";

import classes from "./Loader.module.scss";

const Loader = (): JSX.Element => {
  const [margin, setMargin] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.getElementById("loader");

      if (margin + 100 >= element!.offsetWidth) {
        setMargin(0);
      } else {
        setMargin((val) => val + 5);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [setMargin, margin]);

  return (
    <div id="loader" className={classes.loading}>
      <div
        className={classes.loader}
        style={{ marginLeft: `${margin}px` }}
      ></div>
    </div>
  );
};

export default Loader;
