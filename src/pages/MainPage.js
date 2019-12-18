import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import { decryption } from "../modules/decryption";

import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Encryption from "../components/encryption";
import Decryption from "../components/decryption";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.onExit = this.onExit.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onExited = this.onExited.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.state = {
            encrypt: 'appear',
            decrypt: 'exited'
        }
    }

    onExit(event) {
        this.setState({
            ...this.state,
            [event.id]: 'exit'
        });
    }

    onEnter(event) {
        this.setState({
            ...this.state,
            [event.id]: 'enter'
        });
    }

    onExited(event) {
        this.setState({
            ...this.state,
            [event.id]: 'exited'
        });
    }

    onEntered(event) {
        this.setState({
            ...this.state,
            [event.id]: 'entered'
        });
    }

    render() {
        const flag = (this.props.rendering == 'encrypt') ? (true) : (false);
        const encrypt = (this.state.encrypt == 'exited' && !flag)?(<div></div>):(<Encryption />);
        const decrypt = (this.state.decrypt == 'exited' && flag)?(<div></div>):(<Decryption />);
        return (
            <div>
                <CSSTransition
                    in={flag}
                    appear={true}
                    classNames="my"
                    timeout={500}
                    onExit={this.onExit}
                    onEnter={this.onEnter}
                    onEntered={this.onEntered}
                    onExited={this.onExited}
                >
                    {encrypt}
                </CSSTransition>
                <CSSTransition
                    in={!flag}
                    classNames="my1"
                    timeout={500}
                    onExit={this.onExit}
                    onEnter={this.onEnter}
                    onEntered={this.onEntered}
                    onExited={this.onExited}
                >
                    {decrypt}
                </CSSTransition>
            </div>
        )
    }
}

MainPage.propTypes = {
    rendering: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    rendering: state.render.component
});

export default connect(mapStateToProps, null)(MainPage);