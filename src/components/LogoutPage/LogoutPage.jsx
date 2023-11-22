import { useEffect } from "react";
import axios from "axios";
const LogoutPage = () => {
    useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    (async () => {
      try {
        const { data } = await axios.post(
            `${backendUrl}/logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
};
export default LogoutPage