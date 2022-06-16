// Material
import Box from '@mui/material/Box';

// Config
import AppConfig from '../../../config';

export default function Decoration() {
   return (
    <Box
        sx={{
          background: AppConfig.theme.header.background,
          position: "absolute",
          zIndex: "-1",
          top: 0,
          left: 0,
          width: "100%",
          height: "400px",
          overflow: "hidden"
        }}
      / >
  );
}