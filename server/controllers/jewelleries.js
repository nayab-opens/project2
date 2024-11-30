const Jewelleries = require('../model/jewelleries'); // Import your Jewellery model

exports.addJewelleries = async (req, res) => {
    try {
        // Extract data from the form
        const { Product, Category, Price, Color, Metal, Size } = req.body;

        // Create a new jewellery item
        const newJewelleries = new Jewelleries({
            Product,
            Category,
            Price,
            Color,
            Metal,
            Size,
        });

        // Save it to the database
        await newJewelleries.save();

        // Redirect back to the jewellery list
        res.redirect('/jewellerieslist');
    } catch (error) {
        console.error('Error adding jewellery:', error);
        res.status(500).send('An error occurred while adding the jewellery item.');
    }
};