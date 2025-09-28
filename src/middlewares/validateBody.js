export const validateBody = (schema) => {
  return (req, res, next) => {
    console.log("Validating body:", req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    next();
  };
};

// export const validateBody = (schema) => {
//   return (req, res, next) => {
//     console.log("📥 Before validation:", req.body);

//     const { error, value } = schema.validate(req.body, {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     if (error) {
//       return res.status(400).json({
//         status: 400,
//         message: error.details.map((e) => e.message).join(", "),
//       });
//     }

//     console.log("✅ Validated value:", value);
//     req.body = value;
//     next();
//   };
// };
