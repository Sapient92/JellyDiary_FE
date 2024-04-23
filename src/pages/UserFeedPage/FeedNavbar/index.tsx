import {
  FeedNavbarContainer,
  FeedNavbarContent,
  NavbarButton,
} from "./FeedNavbar.styles.ts";
import VectorButton from "../../../assets/button/ButtonVector.png";

const FeedNavbar = () => {
  return (
    <FeedNavbarContainer>
      <FeedNavbarContent>
        <NavbarButton>
          <img src={VectorButton} />
          <p>POSTS</p>
        </NavbarButton>
      </FeedNavbarContent>
    </FeedNavbarContainer>
  );
};

export default FeedNavbar;
