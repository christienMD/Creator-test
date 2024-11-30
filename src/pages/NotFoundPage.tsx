import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h2>404 Not Found</h2>

      <Link to="/home">Home</Link>
    </div>
  );
}

export default NotFoundPage;
