import { useEffect, useState } from "react";
import { getRandomName } from "./utils";

export const useUserPersistentName = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getRandomName());
  }, []);

  return name;
};
