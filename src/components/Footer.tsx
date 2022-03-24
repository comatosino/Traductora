import { Box, Fab } from "@mui/material";
import { Page } from "../pages/app/Translator";
import HistoryIcon from "@mui/icons-material/History";
import MicNoneIcon from "@mui/icons-material/MicNone";
import theme from "../themes/theme";

type FooterProps = {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

const Footer: React.FC<FooterProps> = ({ page, setPage }): JSX.Element => {
  return (
    <Box sx={{ bgcolor: theme.palette.secondary.main }}>
      <footer >
        <nav
          style={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* GOTO HISTORY */}
          {page === Page.MAIN && (
            <Fab
              onClick={() => setPage(Page.HISTORY)}
              color="primary"
              aria-label="mic"
            >
              <HistoryIcon />
            </Fab>
          )}

          {/* GOTO MICROPHONE */}
          {(page === Page.HISTORY || page === Page.OPTIONS) && (
            <Fab
              onClick={() => setPage(Page.MAIN)}
              color="primary"
              aria-label="mic"
            >
              <MicNoneIcon />
            </Fab>
          )}
        </nav>
      </footer>
    </Box>
  );
};

export default Footer;
