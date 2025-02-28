/*const Order = require("../models/orderModels");
const Cart = require("../models/cartModels");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.checkout = async(req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate
        ("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }
        const totalAmount = cart.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartModels.item.map((item) => ({
                price_date: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: '${process.env.FRONTEND_URL}/payment-success',
            cancel_url: '${process.env.FRONTEND_URL}/payment_failed',
        });
        res.join({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/