import { useRef } from "react";
import { Overlay } from "./components/Overlay";

const Home = () => {
  const scroll = useRef(0);
  return (
    <><Overlay scroll={scroll} />
      
      
    </>
  );
};

export default Home;
