import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectRoute({ auth, child }) {
  console.log(auth);
  if (auth == null) {
    return <Navigate to="/login" replace />;
  }
  //return element if protect one route or return many elements if protect many routes
  return child ? child : <Outlet />;
}
