
import { Navigate } from "react-router-dom";

const App = () => {
  // This component redirects to the static HTML file
  window.location.href = "/index.html";
  return <Navigate to="/" />;
};

export default App;
