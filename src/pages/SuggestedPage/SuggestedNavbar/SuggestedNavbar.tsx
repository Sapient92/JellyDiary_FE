import {
  SuggestedNavbarContainer,
  SuggestedNavbarContent,
  NavbarButton,
} from "./SuggestedNavbar.styles.ts";
import VectorButton from "../../../assets/button/ButtonVector.png";

const SuggestedNavbar = () => {
  return (
    <SuggestedNavbarContainer>
      <SuggestedNavbarContent>
        <NavbarButton>
          <img src={VectorButton} />
          <p>POSTS</p>
        </NavbarButton>
      </SuggestedNavbarContent>
    </SuggestedNavbarContainer>
  );
};

export default SuggestedNavbar;
