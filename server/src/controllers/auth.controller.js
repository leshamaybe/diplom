import authService from "../services/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email } = req.body;

            const registerData = await authService.registration(
                username,
                password,
                email
            );

            return res.status(201).json(registerData);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const loginData = await authService.login(username, password);

            return res
                .cookie("refreshToken", loginData.refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .cookie("accessToken", loginData.accessToken, {
                    httpOnly: false,
                    maxAge: 60 * 60 * 1000,
                })
                .status(200)
                .json({
                    message: "Logged in sucessfully",
                    accessToken: loginData.accessToken,
                    ...loginData.data,
                });
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            await authService.logout(refreshToken);

            res.clearCookie("refreshToken");
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken: rt } = req.cookies;

            const refreshData = await authService.refresh(rt);

            res.cookie("refreshToken", refreshData.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).cookie("accessToken", refreshData.accessToken, {
                httpOnly: false,
                maxAge: 60 * 60 * 1000,
            });

            return res.status(200).json({
                accessToken: refreshData.accessToken,
                ...refreshData.data,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
