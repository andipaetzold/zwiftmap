import axios from "axios";
import { useEffect } from "react";

export function usePing() {
  useEffect(() => {
    axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? "https://api.zwiftmap.com"
          : "http://localhost:3001"
      }/ping`
    );
  }, []);
}
