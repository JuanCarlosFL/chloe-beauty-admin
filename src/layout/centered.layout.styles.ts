import { css } from '@emotion/css';
import { theme } from 'core/theme';

export const root = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  align-items: center;
  @media (min-width: ${theme.breakpoints.values.sm}px) {
    justify-items: center;
  }
`;
