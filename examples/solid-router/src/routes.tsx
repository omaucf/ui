import { Route, Router } from "@solidjs/router";

import Index from "./app/index.js";
import Playground from "./app/playground.js";

export default () => (
  <Router>
    <Route component={() => <Index />} path="/" />
    <Route component={() => <Playground />} path="/playground" />
  </Router>
);
