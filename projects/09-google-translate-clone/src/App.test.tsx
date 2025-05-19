import { describe, it, expect, test } from 'vitest';
import {render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('My App worls as expected', async() => {
    const user = userEvent.setup();
    const app = render(<App />);
    const textAreaForm = app.getByPlaceholderText('Introducir texto');

    await user.type(textAreaForm, 'Hola mundo');
    const result = await app.findByDisplayValue(/Hello world/i, {}, {timeout: 2000});

    // expect(result).toBeTruthy();
});