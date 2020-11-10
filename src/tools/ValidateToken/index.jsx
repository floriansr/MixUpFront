import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux';

export const ValidateToken = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken());
  }, []);
};

export default ValidateToken;
