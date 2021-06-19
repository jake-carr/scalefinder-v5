import React, { Component } from 'react';

export default class App extends Component<
  { message: string },
  { count: number }
> {
  state = { count: 0 };
  render() {
    return (
      <div
        className="text-3xl text-pink-200 font-bold"
        onClick={() => this.increment(1)}
      >
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}
