import * as React from "react";
import styled from "@emotion/styled";
import { InteractionNewsletter } from "./interaction-newsletter";
import { InteractionComment } from "./interaction-comment";

const Container = styled.div`
  position: fixed;
  left: calc(50% - 37rem);
  width: 4rem;
  top: 15rem;
  background: #fffb;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const App = () => {
  const [visible, setVisible] = React.useState(true);
  const el = document.getElementById("kommentare");
  const disappearAt = el!.offsetTop - globalThis.innerHeight + 400;

  const handleScroll = () => {
    const top = document.body.scrollTop || document.documentElement.scrollTop;
    setVisible(disappearAt - top > 0);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    visible && (
      <Container>
        <InteractionNewsletter />
        <InteractionComment />
      </Container>
    )
  );
};
