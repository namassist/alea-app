const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });

  if (result.error) {
    return {
      status: 400,
      message: result.error.message,
    };
  } else {
    return result.value;
  }
};

export { validate };
