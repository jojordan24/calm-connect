
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MarbleBackground } from "@/components/ui/marble-background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MarbleBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <Link to="/">
            <Button className="bg-thrive-purple">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </MarbleBackground>
  );
};

export default NotFound;
