import React from 'react';
import * as classes from './centered.layout.styles';

export const CenteredLayout: React.FC = props => {
  const { children } = props;
  return <div className={classes.root}>{children}</div>;
};
