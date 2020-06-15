import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import Register from './Register';
import Faker from "faker";

test("controls email validation", () => {
    render(<Register />);

    const emailInput =  screen.getByPlaceholderText("email");

    fireEvent.change(emailInput, {
        target: {value: "invalid_email"}
    });

    fireEvent.blur(emailInput);

    expect(screen.getByText("Formato de email incorrecto")).toBeInTheDocument();

    fireEvent.change(emailInput, {
        target: {value: Faker.internet.email()}
    });

    fireEvent.blur(emailInput);

    expect(screen.queryByText("Formato de email incorrecto")).toBeNull();
});

test("controls phone validation", () => {
    render(<Register />);

    const phoneInput = screen.getByPlaceholderText("phone");
    fireEvent.change(phoneInput, {
        target: {value: "5012485"}
    });

    fireEvent.blur(phoneInput);

    expect(screen.getByText("Formato de teléfono incorrecto")).toBeInTheDocument();

    fireEvent.change(phoneInput, {
        target: {value: "681522348"}
    });

    fireEvent.blur(phoneInput);

    expect(screen.queryByText("Formato de teléfono incorrecto")).toBeNull();
});

test("dont send form if required field is missing", async () => {
    render(<Register />);

    const submitButton = screen.getByText("Registrar");

    fireEvent.click(submitButton);

    expect(screen.getByText("Falta algún campo obligatorio")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("email"), {
        target: {value: Faker.internet.email()}
    });
    fireEvent.click(submitButton);
    expect(screen.getByText("Falta algún campo obligatorio")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: {value: Faker.name.firstName()}
    });
    fireEvent.click(submitButton);
    expect(screen.getByText("Falta algún campo obligatorio")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("surname"), {
        target: {value: Faker.name.lastName()}
    });
    fireEvent.click(submitButton);
    expect(screen.getByText("Falta algún campo obligatorio")).toBeInTheDocument();

    const password = Faker.internet.password();

    fireEvent.change(screen.getByPlaceholderText("password"), {
        target: {value: password}
    });
    fireEvent.click(submitButton);
    expect(screen.getByText("Falta algún campo obligatorio")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("repeatPassword"), {
        target: {value: password}
    });
    fireEvent.click(submitButton);
    
    expect(screen.queryByText("Falta algún campo obligatorio")).toBeNull();
});

test("controls passwords match", () => {
    render(<Register />);

    const password = Faker.internet.password();
    const submitButton = screen.getByText("Registrar"); 

    fireEvent.change(screen.getByPlaceholderText("email"), {
        target: {value: Faker.internet.email()}
    });
    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: {value: Faker.name.firstName()}
    });
    fireEvent.change(screen.getByPlaceholderText("surname"), {
        target: {value: Faker.name.lastName()}
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
        target: {value: password}
    });
    fireEvent.change(screen.getByPlaceholderText("repeatPassword"), {
        target: {value: password + "asdf"}
    });

    fireEvent.click(submitButton);

    expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("repeatPassword"), {
        target: {value: password}
    });

    fireEvent.click(submitButton);

    expect(screen.queryByText("Las contraseñas no coinciden")).toBeNull();
});
