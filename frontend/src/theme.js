import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Inter, sans-serif",
    },

    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "16px",
                    paddingRight: "16px",
                },
            },
        },
    },
});

export default theme;