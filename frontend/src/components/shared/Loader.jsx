import { Box, CircularProgress } from "@mui/material";

const Loader = ({ fullScreen = false }) => {
    return (
        <Box
            sx={{
                height: fullScreen ? "100vh" : "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;