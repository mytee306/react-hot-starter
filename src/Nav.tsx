import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <nav>
    <h2>Navigation</h2>
    <ul>
      <li>
        <NavLink to="/increment">Increment</NavLink>
      </li>
      <li>
        <NavLink to="/decrement">Decrement</NavLink>
      </li>
    </ul>
  </nav>
);
