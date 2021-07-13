import {screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import renderWithRouter from '../../mocks/renderWithRouter';
import Heroes from './HeroesComponent';
import config from '../../config.json';
import heroesMock from '../../mocks/heroesMock';
import {IHero} from '../../types/hero';

const mockAxios = new MockAdapter(axios);

describe('Heroes Component', () => {
  it('Should render Heroes', async () => {
    // ! arrange
    const spyAxiosGet = jest.spyOn(axios, 'get');
    const tree = renderWithRouter(<Heroes />, '/heroes');
    mockAxios.onGet(config.API_URL.heroes).reply(200, heroesMock);
    // ! act
    await waitFor(() => {
      heroesMock.forEach((hero: IHero) => {
        expect(screen.getByText(hero.name!)).toBeInTheDocument();
      });
    });
    // ! assert
    expect(spyAxiosGet).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });

  it('Should render heroes with title My Heroes', () => {
    // ! arrange
    const component = renderWithRouter(<Heroes />, '/heroes');
    // ! act
    const result = component.queryByText('My Heroes');
    // ! assert
    expect(result).toBeTruthy();
  });
});