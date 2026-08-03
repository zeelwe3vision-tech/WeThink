const authService = require("./auth.service");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const result = await authService.googleLogin(token);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

exports.session = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.bootstrapStatus = async (req, res) => {
  try {
    const result = await authService.bootstrapStatus();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.bootstrap = async (req, res) => {
  try {
    const result = await authService.bootstrap(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
