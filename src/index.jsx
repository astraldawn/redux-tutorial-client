import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ["A", "B"];

ReactDOM.render(
    <Voting pair={pair} />,
    document.getElementById('app')
);