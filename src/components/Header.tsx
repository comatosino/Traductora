import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import HistoryIcon from '@mui/icons-material/History';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';

import theme from '../themes/theme';
import { Page } from '../types/app';
import { HeaderProps } from '../types/props';

const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  const { setPage, handleLogout } = props;
  return (
    <Box sx={{ bgcolor: theme.palette.secondary.main, borderRadius: 1 }}>
      <header>
        <nav
          style={{
            height: '10vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SpeedDial
            ariaLabel='speed-dial-menu'
            direction='right'
            icon={<MenuIcon />}
          >
            <SpeedDialAction
              onClick={() => setPage(Page.MAIN)}
              icon={<MicNoneIcon />}
              tooltipTitle={'Microphone'}
            />
            <SpeedDialAction
              onClick={() => setPage(Page.HISTORY)}
              icon={<HistoryIcon />}
              tooltipTitle={'History'}
            />
            <SpeedDialAction
              onClick={() => setPage(Page.OPTIONS)}
              icon={<TuneIcon />}
              tooltipTitle={'Options'}
            />
            <SpeedDialAction
              onClick={handleLogout}
              icon={<LogoutIcon />}
              tooltipTitle={'Logout'}
            />
          </SpeedDial>
        </nav>
      </header>
    </Box>
  );
};

export default Header;
