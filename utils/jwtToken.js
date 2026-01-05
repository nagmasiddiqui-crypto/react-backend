export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() +
          (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
};
