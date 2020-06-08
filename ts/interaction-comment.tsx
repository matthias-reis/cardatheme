import * as React from 'react';
import { IconComment } from './icons';
import { Box, Label } from './interaction-styles';

export const InteractionComment: React.FC = () => (
  <Box href="#kommentare">
    <IconComment />
    <Label>kommentieren</Label>
  </Box>
);
