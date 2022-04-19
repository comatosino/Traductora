import React from 'react';
import { useAppSelector } from '../../store/hooks';

import Auth from './Auth';
import Translator from '../app/Translator';

const Profile: React.FC = (): JSX.Element => {
  const userProfile = useAppSelector((state) => state.user.profile);
  return userProfile.username ? <Translator user={userProfile} /> : <Auth />;
};

export default Profile;
