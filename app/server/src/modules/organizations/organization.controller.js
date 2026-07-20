const organizationService = require("./organization.service");

exports.getOrganizations = async (req, res) => {
  try {
    const result = await organizationService.getOrganizations();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const result = await organizationService.getOrganizationById(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    const result = await organizationService.createOrganization(req.body);

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

exports.updateOrganization = async (req, res) => {
  try {
    const result = await organizationService.updateOrganization(
      req.params.id,
      req.body,
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const result = await organizationService.deleteOrganization(req.params.id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
