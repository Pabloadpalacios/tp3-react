import { render } from '@testing-library/react';
import React from 'react';
import AppRouter from './AppRouter';

describe('Tests del componente AppRouter.', () => {
  it('El componente AppRouter se renderiza correctamente.', () => {
    const tree = render(<AppRouter />);
    expect(tree).toMatchSnapshot();
  });
});