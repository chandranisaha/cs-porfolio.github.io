
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Redirect to the static HTML page
    window.location.href = "/index.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to portfolio...</p>
    </div>
  );
};

export default Index;
