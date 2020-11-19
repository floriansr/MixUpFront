import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu, message } from 'antd';
import Cookies from 'js-cookie';

import './styles.scss';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import cookieName from 'constants';

import { APIManager } from 'services';

import { removeConnection, removeProfile } from '../../redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logStatus = useSelector((state) => state.log.user_connected);
  const location = useLocation();

  const disconnection = () => {
    const sendDisconnectRequest = async () => {
      try {
        await APIManager.disconnectUser();
        history.push('/');
        Cookies.remove(cookieName);
        dispatch(removeConnection());
        dispatch(removeProfile());
        history.push('/');
        message.success('Hope to see you soon!', 3);
      } catch (error) {
        console.error(error);
        return message.error('An error occurred, please retry.', 3);
      }
    };
    sendDisconnectRequest();
  };

  return (
    <>
      <div>
        <Menu mode="horizontal" theme="dark" className={location.pathname === '/' && 'homeNavbar'}>
          <Menu.Item icon={<HomeOutlined />}>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>

          {logStatus && (
            <Menu.Item disabled icon={<SettingOutlined />}>
              Profile
            </Menu.Item>
          )}

          {logStatus && (
            <Menu.Item className="newPlaylistNavlink" icon={<CustomerServiceOutlined />}>
              <NavLink className="importantLinkText" to="/new-playlist" activeClassName="active">
                CREATE A PLAYLIST
              </NavLink>
            </Menu.Item>
          )}

          <Menu.Item disabled icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <Menu.Item disabled icon={<MailOutlined />}>
            Contact
          </Menu.Item>

          {logStatus && (
            <Menu.Item icon={<LogoutOutlined />}>
              <NavLink type="button" onClick={disconnection} to="/">
                Logout
              </NavLink>
            </Menu.Item>
          )}

          {!logStatus && (
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/sign_in" activeClassName="active">
                Sign in
              </NavLink>
            </Menu.Item>
          )}

          {!logStatus && (
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/sign_up" activeClassName="active">
                Sign up
              </NavLink>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
