import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { showToDectyptPage, showToEnctyptPage } from '../actions/renderAction';

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Label";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.select = React.createRef();

        this.onSelected = this.onSelected.bind(this);
    }

    componentDidMount() {
        this.select.current.addEventListener('itemSelect', event => {
            this.onSelected(event);
        });
    }

    onSelected(event) {
        //console.log(event);
        if(event.detail.item.id == 'encryption') {
            this.props.showToEnctyptPage();
        }

        if(event.detail.item.id == 'decryption') {
            this.props.showToDectyptPage();
        }
        
    }

    render() {
        return (
            <div>
                <ui5-tabcontainer ref={this.select} class="full-width" collapsed fixed show-overflow>
                    <ui5-tab id="encryption" text='Зашифровать' selected>
                    </ui5-tab>
                    <ui5-tab id="decryption" text='Расшфровать'>
                    </ui5-tab>
                </ui5-tabcontainer>
            </div>
        )
    }
}

Navbar.propTypes = {
    showToDectyptPage: PropTypes.func.isRequired,
    showToEnctyptPage: PropTypes.func.isRequired
}

export default connect(null, { showToDectyptPage, showToEnctyptPage })(Navbar);