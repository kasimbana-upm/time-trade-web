import React, { Component, ChangeEvent } from "react";
import { TextField, Card, CardActions, CardContent, Typography, Button } from "@material-ui/core"
import "./Register.css";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface State {
    user: {
        email: string;
        name: string;
        surname: string;
        password: string;
        repeatPassword: string;
        phone: string;
    },
    message: {
        show: boolean,
        text: string
    },
    helpers: {
        email: {
            show: boolean,
            text: string
        }
    }
}

const customStyles: Record<string, CSSProperties> = {
    card: {
        width: "50%",
        margin: "auto",
        marginTop: "30vh",
        backgroundColor: "#95a792",
        color: "#596c68",
        maxWidth: "700px"
    },
    oneColumnTextfield: {
        width: "100%",
        marginTop: "20px"
    },
    twoColumnTextfield: {
        width: "48%"
    },
    cardActions: {
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#596c68",
        color: "#e3d9ca"
    }
};



class Register extends Component<any, State> {
    constructor(props: State) {
        super(props);
        this.state = {
            user: {
                email: "",
                name: "",
                surname: "",
                password: "",
                repeatPassword: "",
                phone: ""
            },
            message: {
                show: false,
                text: ""
            },
            helpers: {
                email: {
                    show: false,
                    text: "Formato de email inconrrecto"
                }
            }
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }

    handleSubmit = () => {
        const user = this.state.user;
        const helpers = this.state.helpers;

        const incompleteForm = !user.email || !user.name || !user.surname || !user.password || !user.repeatPassword;

        if(incompleteForm || helpers.email.show) {
            console.error("Invalid form");
            return;
        }

        console.log(this.state);
    }

    isCorrectEmail = () => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const correctEmail = regex.test(this.state.user.email.toLowerCase());

        const helpers = {...this.state.helpers};
        helpers.email.show = !correctEmail;
        this.setState({helpers});
    }

    render() {
        return (
            <div className="root">
                <Card style={customStyles.card}>
                    <CardContent>
                        <Typography variant="h3" align="center">
                            Registro
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="email" label="EMAIL" variant="outlined" style={customStyles.oneColumnTextfield} value={this.state.user.email} onChange={this.onInputChange} required={true} error={this.state.helpers.email.show} helperText={this.state.helpers.email.show ? this.state.helpers.email.text : null} onBlur={this.isCorrectEmail}/>
                            <div className="two-field-wrapper">
                                <TextField name="name" label="NOMBRE" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.user.name} onChange={this.onInputChange} required={true}/>
                                <TextField name="surname" label="APELLIDOS" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.user.surname} onChange={this.onInputChange} required={true}/>
                            </div>
                            <div className="two-field-wrapper">
                                <TextField type="password" name="password" label="CONTRASEÑA" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.user.password} onChange={this.onInputChange} required={true}/>
                                <TextField type="password" name="repeatPassword" label="REPITA LA CONTRASEÑA" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.user.repeatPassword} onChange={this.onInputChange} required={true}/>
                            </div>
                            <TextField name="phone" label="TELÉFONO" variant="outlined" style={customStyles.oneColumnTextfield} value={this.state.user.phone} onChange={this.onInputChange}/>
                        </form>
                    </CardContent>
                    <CardActions style={customStyles.cardActions}>
                        <Button type="submit" style={customStyles.button} onClick={this.handleSubmit} size="large">
                            Registrar
                        </Button>
                    </CardActions>
                </Card>
                {this.state.message.show &&
                    <p className="message">{this.state.message.text}</p>
                }
            </div>
        );
    }
}

export default Register;
