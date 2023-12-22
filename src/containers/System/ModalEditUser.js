import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.isClose();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (const element of arrInput) {
            if (!this.state[element]) {
                isValid = false
                alert('Missing parameters: ' + element)
                break;
            }
        }
        return isValid;
    }
    handleEditUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state)
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new User</ModalHeader>
                <ModalBody>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label >Email</label>
                            <input type="email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                // name="email" placeholder="Email"
                                disabled
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                disabled
                                // name="password" placeholder="Password" 
                                value={this.state.password} />
                        </div>

                    </div>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            // name="firstName" placeholder="firstName" 
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                // name="lastName" placeholder="lastName" 
                                value={this.state.lastName} />
                        </div>
                    </div>
                    <div className='modal-body-user'>
                        <div className="input-container max-with-input">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                // name="inputAddress" placeholder="1234 Main St"
                                value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleEditUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
