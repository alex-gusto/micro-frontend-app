import { render } from "react-dom";

import("./bootstrap")
  .then((m) => m.default())
  .then((App) => {
    render(<App />, document.getElementById("loader"));
  });
