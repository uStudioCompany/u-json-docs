import React from 'react';

import { ErrorComponent } from '../error';

import { Props, State } from './error-boundary.types';

export class ErrorBoundaryComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <ErrorComponent error={error} /> : children;
  }
}
