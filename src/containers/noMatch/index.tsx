import Goat from "assets/images/goat.png";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center flex-col">
      <div className="text-4xl ">Ahhhhhhhhhhhhhh, this page doesn't exist</div>
      <div className="text-center mt-5 mb-16">
        Don't worry. You can either head back to the{" "}
        <Link to="/">
          <span className="font-bold">homepage</span>
        </Link>
        , <br />
        or sit here and email me about this test while listening to a goat
        scream like a human.
      </div>
      <img src={Goat} />
    </div>
  );
};

export default NoMatch;
