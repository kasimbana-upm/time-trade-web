import React, { Component } from "react";
import { TextField, Card, CardActions, CardContent, Typography, Button } from "@material-ui/core"
import "./Register.css";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface State {
    email: string;
    name: string;
    surname: string;
    password: string;
    repeatPassword: string;
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
            email: "",
            name: "",
            surname: "",
            password: "",
            repeatPassword: ""
        };

        this.handlechange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlechange(event: any) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <Card style={customStyles.card}>
                <CardContent>
                    <Typography variant="h3" align="center">
                        Registro
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="email" label="EMAIL" variant="outlined" style={customStyles.oneColumnTextfield} value={this.state.email} onChange={this.handlechange} />
                        <div className="two-field-wrapper">
                            <TextField name="name" label="NOMBRE" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.name} onChange={this.handlechange} />
                            <TextField name="surname" label="APELLIDOS" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.surname} onChange={this.handlechange} />
                        </div>
                        <div className="two-field-wrapper">
                            <TextField type="password" name="password" label="CONTRASEÑA" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.password} onChange={this.handlechange} />
                            <TextField type="password" name="repeatPassword" label="REPITA LA CONTRASEÑA" variant="outlined" style={customStyles.twoColumnTextfield} value={this.state.repeatPassword} onChange={this.handlechange} />
                        </div>
                    </form>
                </CardContent>
                <CardActions style={customStyles.cardActions}>
                    <Button type="submit" style={customStyles.button} onClick={this.handleSubmit} size="large">
                        Registrar
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default Register;
