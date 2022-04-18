import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../src/views/Login/Login';

describe("Login test", () => {
    test("First test", () => {
        render(<Login />);
        const linkElement = screen.getByText(/¿Olvidó su contraseña?/i);
        expect(linkElement).toBeInTheDocument();
    })
})