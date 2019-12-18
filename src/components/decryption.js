import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { decryptMessage } from "../actions/encodedAction";

import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/MessageStrip";
import "@ui5/webcomponents/dist/Dialog"

const output = {
    width: '100%',
    height: '150px'
};

const input = {
    width: '100%',
    height: '150px'
};

class Decryption extends Component {

    constructor(props) {
        super(props);

        this.decryptButton = React.createRef();
        this.dialogButton = React.createRef();
        this.messageInput = React.createRef();
        this.dialog = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.selectItem = this.selectItem.bind(this);

        this.state = {
            message: null,
            alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
            decryptionMessage: '',
            shift: null
        };
    }

    selectItem(event) {

        console.log(event);

        this.setState({
            ...this.state,
            decryptionMessage: event.detail.item.attributes['msg'].value,
            shift: event.detail.item.attributes['shift'].value
        });
        
        document.getElementById('dialog').close();
    }

    // this.props.decryptionMessages;
    onClick(event) {

        var rep = /[a-zA-Z]/;
        if(rep.test(this.state.message)) {
            alert('Нельзя использовать анлийский язык');
            return;
        }

        this.props.decryptMessage(this.state.message.toUpperCase(), this.state.alphabet);

        if(this.props.decryptionMessages.length > 1) {
            document.getElementById('dialog').open();
        } else {
            this.setState({
                ...this.state,
                decryptionMessage: this.props.decryptionMessages[0].msg,
                shift: this.props.decryptionMessages[0].shift
            });
        }

    }

    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.decryptButton.current.addEventListener('click', event => {
            this.onClick(event);
        });

        this.messageInput.current.addEventListener('change', event => {
            this.onChange(event);
        });

        this.dialog.current.addEventListener('itemClick', event => {
            this.selectItem(event);
        });

        this.dialogButton.current.addEventListener('click', event => {
            document.getElementById('dialog').open();
        });
    }

    render() {

        const shift = this.props.decryptionMessages.length === 0 ? false : true;
        const open = this.props.decryptionMessages.length > 1 ? true : false;

        return (
            <div id='decrypt' className='content'>
                <ui5-dialog
                    id="dialog" header-text="Выбрать сдвиг">
                    <ui5-messagestrip style={{width: '300px'}} type="Warning">
                        В данном случае невозможно точно определить сдвиг. 
                        Выберете его из списка предложенных. 
                    </ui5-messagestrip>
                    <ui5-list
                        ref={this.dialog} 
                        style={{height: '300px'}}>
                        {this.props.decryptionMessages.map(item => (
                            <ui5-li
                                msg={item.msg}
                                shift={item.shift} 
                                key={item.shift}>
                                {item.shift}
                            </ui5-li>
                        ))}
                    </ui5-list>
                </ui5-dialog>
                <ui5-title level="H1">Расшифровка сообщения</ui5-title>
                <ui5-messagestrip style={{width: '50%'}} type="Warning">
                    Расшифровка реализована методом частотного анализа.
                    Поэтому, для того, что бы получить корректно расшфрованое сообщение
                    необходмо, чтобы оно было достаточно длинным.
                </ui5-messagestrip>
                <div className="container">
                    <ui5-label>Сообщение:</ui5-label>
                    <ui5-textarea style={input} ref={this.messageInput} name="message" placeholder="Введите исходное соощение"></ui5-textarea>
                </div>
                <div className="container">
                    <ui5-button ref={this.decryptButton} design="Default">Расшфровать</ui5-button>
                    <ui5-button 
                        style={{marginLeft: '10px', display: open ? 'inline-block' : 'none'}} 
                        ref={this.dialogButton} 
                        design="Default">Вырать сдвиг</ui5-button>
                    <br /> 
                </div>
                <div className="container">
                    <ui5-textarea
                        readonly
                        style={output}
                        placeholder="Здесь будет ваше расшфрованное сообщение..." 
                        value={this.state.decryptionMessage}>
                    </ui5-textarea>
                    {shift && <ui5-label>Cдвиг: {this.state.shift}</ui5-label>}
                </div>
            </div>
        )
    }
}

Decryption.propTypes = {
    decryptMessage: PropTypes.func.isRequired,
    decryptionMessages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    decryptionMessages: state.encoded.messages
});

export default connect(mapStateToProps, { decryptMessage })(Decryption);
