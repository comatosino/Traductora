import { setFetching, setUser, clearUser, delTranslation } from '.';
import { AppThunk } from '..';
import { Credentials } from '../../types/API';
import API from '../../utils/API';

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    const response = await API.getUser();
    const { profile } = response.data;
    dispatch(setUser(profile));
  } catch (error) {
    console.error(error);
    localStorage.removeItem('translator-token');
  } finally {
    dispatch(setFetching(false));
  }
};

export const register =
  (credentials: Credentials): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true));
      const response = await API.register(credentials);
      const { profile, token } = response.data;
      localStorage.setItem('translator-token', token);
      dispatch(setUser(profile));
    } catch (error) {
      console.error(error);
      localStorage.removeItem('translator-token');
      dispatch(clearUser());
    } finally {
      dispatch(setFetching(false));
    }
  };

export const login =
  (credentials: Credentials): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true));
      const response = await API.login(credentials);
      const { profile, token } = response.data;
      localStorage.setItem('translator-token', token);
      dispatch(setUser(profile));
    } catch (error) {
      console.error(error);
      localStorage.removeItem('translator-token');
      dispatch(clearUser());
    } finally {
      dispatch(setFetching(false));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    await API.logout();
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem('translator-token');
    dispatch(clearUser());
    dispatch(setFetching(false));
  }
};

export const deleteTranslation =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await API.delete(id);
      dispatch(delTranslation(id));
    } catch (error) {
      console.error(error);
    }
  };
