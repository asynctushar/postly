import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validators/user.schema";
import { useAuth } from "../context/auth/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "../context/snackbar/useSnackbar";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await login(data);

            showSnackbar("Login successful", "success");
            navigate("/");
        } catch (err) {
            showSnackbar(
                err?.response?.data?.message || "Login failed",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Paper
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                }}
            >
                <Typography align="center" variant="h5" mb={2}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, py: 1.5 }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <Typography mt={2} textAlign="center">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;