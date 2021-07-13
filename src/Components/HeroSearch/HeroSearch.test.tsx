import {render} from '@testing-library/react';
import React from 'react';
import heroesMock from '../../mocks/heroesMock';
import HeroSearch from './HeroSearch';

describe('HeroSearch Component', () => {
  it('Should render HeroSearch', () => {
    // ! arrange and act
    const tree = render(<HeroSearch heroesList={heroesMock} />);
    // ! assert
    expect(tree).toMatchSnapshot();
  });
});