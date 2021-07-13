import {render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import config from '../../config.json';
import {IHero} from '../../types/hero';
import heroesMock from '../../mocks/heroesMock';
import renderWithRouter from '../../mocks/renderWithRouter';
import Dashboard from './DashboardComponent';

const mockAxios = new MockAdapter(axios);

describe('Dashboard Component', () => {
  test('Should render component', async () => {
    // ! arrange
    const spyAxiosGet = jest.spyOn(axios, 'get');
    const tree = renderWithRouter(<Dashboard />, '/dashboard');
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

  test('Should render title Top Heroes', () => {
    // ! arrange
    const component = render(<Dashboard />);
    // ! act
    const result = component.queryByText('Top Heroes');
    // ! assert
    expect(result).toBeTruthy();
  });
});