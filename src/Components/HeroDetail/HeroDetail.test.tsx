import {screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderWithRouter from '../../mocks/renderWithRouter';
import config from '../../config.json';
import heroesMock from '../../mocks/heroesMock';
import {IHero} from '../../types/hero';
import HeroDetail from './HeroDetail';
import React from 'react';

const mockAxios = new MockAdapter(axios);
const hero: IHero = heroesMock[0];
const url: string = `/hero-detail/${hero.id}`;

jest.mock('react-router-dom', () => ({
  // use actual for all non-hook parts
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({heroId: 12}),
}));

describe('HeroDetail Component', () => {
  it('Should render HeroDetail', async () => {
    // ! arrange
    const spyAxiosGet = jest.spyOn(axios, 'get');
    mockAxios
        .onGet(`${config.API_URL.heroes}?id=${hero.id}`)
        .reply(200, [hero]);
    const tree = renderWithRouter(<HeroDetail />, url);
    // ! act
    await waitFor(() => {
      expect(screen.getByText(`${hero.name!} Details`)).toBeInTheDocument();
    });
    // ! assert
    expect(spyAxiosGet).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });

  it('Should render label with text Hero name', () => {
    // ! arrange
    const component = renderWithRouter(<HeroDetail />, url);
    // ! act
    const result = component.queryAllByText('Hero name:');
    // ! assert
    expect(result).toBeTruthy();
  });
});