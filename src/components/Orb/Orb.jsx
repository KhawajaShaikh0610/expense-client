// import React from "react";
// import styled, { keyframes } from "styled-components";

// const Orb = () => {
//   const moveOrb = keyframes`
//     0%{
//     transform:translate(0,0);
//     }
//     50%{
//     transform:translate(400px,500px);
//     }
//     100%{
//     transform:translate(0,0);
//     }`;

//   const OrbStyled = styled.div`
//     width: 70vh;
//     height: 70vh;
//     position: absolute;
//     border-radius: 50%;
//     margin-left: -37vh;
//     margin-top: -37vh;
//     background: linra-gradient(180deg, #f56692 0%, #f2994a 100%);
//     filter: blur(100px);
//     animation: ${moveOrb} 15s alternate linear infinite;
//   `;
//   return <OrbStyled>Orb</OrbStyled>;
// };

// export default Orb;

import React from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

function Orb() {
  const { width, height } = useWindowSize();
  const moveOrb = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${width / 1.5}px, ${height / 2}px);
  }
  100% {
    transform: translate(0, 0);
  }
  `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: 5vh;
    margin-top: 15vh;
    background: linear-gradient(
      180deg,
      #f56692 0%,
      #f2994a 100%
    ); /* Fixed the typo here */
    filter: blur(150px);
    animation: ${moveOrb} 15s alternate linear infinite;
  `;
  return <OrbStyled></OrbStyled>;
}

export default Orb;

// import React from "react";

// const Orb = () => {
//   return <div>Orb</div>;
// };

// export default Orb;
