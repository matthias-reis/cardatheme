import styled from '@emotion/styled';
import { color, fontSize, space } from './style';

export const Box = styled.a`
  display: block;
  margin-bottom: ${space[3]};
  color: ${color.neutral[3]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${color.neutral[1]};
  }
`;

export const Label = styled.div`
  font-size: ${fontSize[0]};
  line-height: 1;
`;
