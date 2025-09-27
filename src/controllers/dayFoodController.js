export const getAllFoodByDateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const date = req.query.date; // Expecting date in 'YYYY-MM-DD' format
        
  } catch (error) {
    next(error);
  }
};

export const addFoodToTodayController = async (req, res) => {};

export const removeFoodFromTodayController = async (req, res) => {};
