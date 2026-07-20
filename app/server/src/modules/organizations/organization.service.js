const supabase = require("../../config/supabase");

exports.getOrganizations = async () => {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .order("organization_name");

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    organizations: data,
  };
};

exports.getOrganizationById = async (id) => {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      success: false,
      message: "Organization not found",
    };
  }

  return {
    success: true,
    organization: data,
  };
};

exports.createOrganization = async (organizationData) => {
  const {
    organizationName,
    organizationCode,
    email,
    phone,
    website,
    logoUrl,
    address,
    city,
    state,
    country,
    postalCode,
    timezone,
    currency,
    status,
  } = organizationData;

  const { data, error } = await supabase
    .from("organizations")
    .insert([
      {
        organization_name: organizationName,
        organization_code: organizationCode,
        email,
        phone,
        website,
        logo_url: logoUrl,
        address,
        city,
        state,
        country,
        postal_code: postalCode,
        timezone,
        currency,
        status,
      },
    ])
    .select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Organization created successfully",
    organization: data[0],
  };
};

exports.updateOrganization = async (id, organizationData) => {
  const {
    organizationName,
    organizationCode,
    email,
    phone,
    website,
    logoUrl,
    address,
    city,
    state,
    country,
    postalCode,
    timezone,
    currency,
    status,
  } = organizationData;

  const { data, error } = await supabase
    .from("organizations")
    .update({
      organization_name: organizationName,
      organization_code: organizationCode,
      email,
      phone,
      website,
      logo_url: logoUrl,
      address,
      city,
      state,
      country,
      postal_code: postalCode,
      timezone,
      currency,
      status,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Organization updated successfully",
    organization: data[0],
  };
};

exports.deleteOrganization = async (id) => {
  const { error } = await supabase.from("organizations").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Organization deleted successfully",
  };
};
