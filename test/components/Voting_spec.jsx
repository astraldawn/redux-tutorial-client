import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {List} from 'immutable';
import {expect} from 'chai';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["A", "B"]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal("A");
        expect(buttons[1].textContent).to.equal("B");
    });

    it('invokes callback when button is clicked', () => {
        let votedWith;
        // Vote is a function, which takes an entry as its argument
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Voting pair={["A", "B"]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);
        expect(votedWith).to.equal("A");
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={["A", "B"]}
                    hasVoted="A"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={["A", "B"]}
                    hasVoted="A"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('render just the winner if there is one', () => {
        const component = renderIntoDocument(
            <Voting winner="A"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain("A");
    });

    it('renders as a pure component', () => {
        const pair = ["A", "B"];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal("A");

        pair[0] = 'Sunshine';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal("A");
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of("A", "B");
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal("A");

        const newPair = pair.set(0, "C");
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal("C");
    })

});