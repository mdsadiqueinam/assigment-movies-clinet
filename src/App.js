import { lazy, Suspense } from "react";
import Header from "components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinearProgress } from "@mui/material";
// import UploadForm from "components/UploadForm";

const Movies = lazy(() => import("components/Movies"));
const UploadForm = lazy(() => import("components/UploadForm"));

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Switch>            
          <Suspense fallback={<LinearProgress color="secondary" />}>
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/" component={UploadForm} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
