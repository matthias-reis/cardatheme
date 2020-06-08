import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';

console.log('hallo');

const el = document.getElementById('c_interact');
if (el) {
  render(<App />, el);
}
