import React, { Component } from 'react';
import '../css/encryption.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { encryptMessage } from "../actions/encodedAction";


import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/Option";

const output = {
    width: '100%',
    height: '150px'
};

const input = {
    width: '100%',
    height: '150px'
};

class Encryption extends Component {

    constructor(props) {
        super(props);

        this.massageInput = React.createRef();
        this.shiftInput = React.createRef();
        this.encryptButton = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.change = this.change.bind(this);

        this.state = {
            massage: '',
            shift: 0,
            alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
            encryptionMessage: ''
        }
    }

    change(event) {
        const value = event.detail.selectedOption.attributes['value'].value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    onClick(event) {

        var rep = /[a-zA-Z]/;
        if(rep.test(this.state.message)) {
            alert('Нельзя использовать анлийский язык');
            return;
        }

        this.props.encryptMessage(this.state.massage, Number(this.state.shift), this.state.alphabet);
        var sMessage = this.props.encryptionMessage;
        this.setState({
            ...this.state,
            encryptionMessage: sMessage
        });
    }

    componentDidMount() {
        this.massageInput.current.addEventListener('change', event => {
            this.onChange(event);
        });

        this.shiftInput.current.addEventListener('change', event => {
            this.change(event);
        });

        this.encryptButton.current.addEventListener('click', event => {
            this.onClick(event);
        });

    }

    render() {

        const listItem = (this.state.encryptionMessage == '') ? (null) : ((<ui5-li icon="sap-icon://accept">{this.state.encryptionMessage}</ui5-li>));

        return (
            <div id='encrypt' className='content'>
                <ui5-title level="H1">Шифрование сообщения</ui5-title>
                <div className="container">
                    <ui5-label>Соощение:</ui5-label>
                    <ui5-textarea
                        style={input}
                        required
                        ref={this.massageInput}
                        name="massage" 
                        placeholder="Введите исходное соощение"></ui5-textarea>
                </div>
                <div className="container">
                    <ui5-label>Сдвиг:</ui5-label>
                    <ui5-select style={{width: '20%', display: 'block'}} name='shift' ref={this.shiftInput} class="select">
                        <ui5-option value={1} selected>1</ui5-option>
                        <ui5-option value={2}>2</ui5-option>
                        <ui5-option value={3}>3</ui5-option>
                        <ui5-option value={4}>4</ui5-option>
                        <ui5-option value={5}>5</ui5-option>
                        <ui5-option value={6}>6</ui5-option>
                        <ui5-option value={7}>7</ui5-option>
                        <ui5-option value={8}>8</ui5-option>
                        <ui5-option value={9}>9</ui5-option>
                        <ui5-option value={10}>10</ui5-option>
                        <ui5-option value={11}>11</ui5-option>
                        <ui5-option value={12}>12</ui5-option>
                        <ui5-option value={13}>13</ui5-option>
                        <ui5-option value={14}>14</ui5-option>
                        <ui5-option value={15}>15</ui5-option>
                        <ui5-option value={16}>16</ui5-option>
                        <ui5-option value={17}>17</ui5-option>
                        <ui5-option value={18}>18</ui5-option>
                        <ui5-option value={19}>19</ui5-option>
                        <ui5-option value={20}>20</ui5-option>
                        <ui5-option value={21}>21</ui5-option>
                        <ui5-option value={22}>22</ui5-option>
                        <ui5-option value={23}>23</ui5-option>
                        <ui5-option value={24}>24</ui5-option>
                        <ui5-option value={25}>25</ui5-option>
                        <ui5-option value={26}>26</ui5-option>
                        <ui5-option value={27}>27</ui5-option>
                        <ui5-option value={28}>28</ui5-option>
                        <ui5-option value={29}>29</ui5-option>
                        <ui5-option value={30}>30</ui5-option>
                        <ui5-option value={31}>31</ui5-option>
                        <ui5-option value={32}>32</ui5-option>
                    </ui5-select>
                </div>
                <div className="container">
                    <ui5-button ref={this.encryptButton} design="Default">Зашифровать</ui5-button><br /> 
                </div>
                <div className="container">
                    <ui5-textarea
                        readonly
                        style={output}
                        placeholder="Здесь будет ваше зашфрованное сообщене..." 
                        value={this.state.encryptionMessage}>
                    </ui5-textarea>
                </div>
            </div>
        )
    }
}

Encryption.propTypes = {
    encryptMessage: PropTypes.func.isRequired,
    encryptionMessage: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    encryptionMessage: state.encoded.message,
});

export default connect(mapStateToProps, { encryptMessage })(Encryption);
