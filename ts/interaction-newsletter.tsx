import * as React from 'react';
import { IconNewsletter as UnstyledIconNewsletter } from './icons';
import { Box, Label } from './interaction-styles';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const ring = keyframes`
  from, 65%, to {
    transform: rotate(0deg);
  }

  70%, 79%, 87%, 93%, 98% {
    transform: rotate(-15deg);
  }
  
  75%, 83%, 90%, 96% {
    transform: rotate(15deg);
  }
`;

const IconNewsletter = styled(UnstyledIconNewsletter)`
  animation: ${ring} 4s ease-in;
`;

export const InteractionNewsletter: React.FC = () => (
  <Box
    target="_blank"
    rel="noopener, noreferrer"
    href="https://mailchi.mp/94bdbb6fded3/cardamonchai">
    <IconNewsletter />
    <Label>
      Newsletter
      <br />
      abonnieren
    </Label>
  </Box>
);
