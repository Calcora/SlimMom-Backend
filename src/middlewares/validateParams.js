export const validateParams = (schema) => {
  return (req, res, next) => {
    console.log("Validating params:", req.params);
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    next();
  };
};
