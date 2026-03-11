const bcrypt = require("bcryptjs");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");
const Store = require("../src/models/Store");
const MenuItem = require("../src/models/MenuItem");
const Order = require("../src/models/Order");
const ROLES = require("../src/constants/roles");
const { ORDER_STATUS } = require("../src/constants/orderStatus");

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Store.deleteMany({}),
    MenuItem.deleteMany({}),
    Order.deleteMany({}),
  ]);

  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const customerPassword = await bcrypt.hash("Customer@123", 10);

  const admins = await User.insertMany([
    {
      name: "Aisha Rahman",
      email: "aisha@feedhub.com",
      password: adminPassword,
      role: ROLES.ADMIN,
      phone: "+1555000111",
    },
    {
      name: "Marco Silva",
      email: "marco@feedhub.com",
      password: adminPassword,
      role: ROLES.ADMIN,
      phone: "+1555000222",
    },
    {
      name: "Nina Patel",
      email: "nina@feedhub.com",
      password: adminPassword,
      role: ROLES.ADMIN,
      phone: "+1555000333",
    },
  ]);

  const customer = await User.create({
    name: "Demo Customer",
    email: "customer@feedhub.com",
    password: customerPassword,
    role: ROLES.CUSTOMER,
    phone: "+1555000444",
    address: "742 Evergreen Terrace",
  });

  const stores = await Store.insertMany([
    {
      name: "Spice Route Kitchen",
      slug: "spice-route-kitchen",
      description: "Bold Indian curries, biryanis, and tandoori specials.",
      address: "101 Market Street",
      phone: "+1555101000",
      adminId: admins[0]._id,
      cuisineType: "Indian",
      openingHours: "11:00 AM - 11:00 PM",
      rating: 4.7,
    },
    {
      name: "Bella Napoli",
      slug: "bella-napoli",
      description: "Classic wood-fired pizzas and house-made pasta.",
      address: "220 King Avenue",
      phone: "+1555202000",
      adminId: admins[1]._id,
      cuisineType: "Italian",
      openingHours: "10:00 AM - 10:30 PM",
      rating: 4.6,
    },
    {
      name: "Green Bowl",
      slug: "green-bowl",
      description: "Healthy bowls, wraps, and smoothies for everyday fuel.",
      address: "77 Lakeview Drive",
      phone: "+1555303000",
      adminId: admins[2]._id,
      cuisineType: "Healthy",
      openingHours: "8:00 AM - 9:00 PM",
      rating: 4.8,
    },
  ]);

  const menuItems = await MenuItem.insertMany([
    {
      storeId: stores[0]._id,
      name: "Butter Chicken",
      description: "Creamy tomato curry with tender chicken.",
      price: 14.99,
      category: "Main",
      tags: ["bestseller"],
    },
    {
      storeId: stores[0]._id,
      name: "Paneer Tikka",
      description: "Char-grilled cottage cheese skewers.",
      price: 11.5,
      category: "Starter",
      tags: ["vegetarian", "chef-special"],
    },
    {
      storeId: stores[0]._id,
      name: "Hyderabadi Biryani",
      description: "Aromatic basmati layered with spices.",
      price: 13.25,
      category: "Rice",
      tags: ["spicy"],
    },
    {
      storeId: stores[1]._id,
      name: "Margherita Pizza",
      description: "San Marzano tomato, basil, and mozzarella.",
      price: 12,
      category: "Pizza",
      tags: ["vegetarian", "bestseller"],
    },
    {
      storeId: stores[1]._id,
      name: "Truffle Alfredo Pasta",
      description: "Fettuccine in creamy truffle sauce.",
      price: 15.75,
      category: "Pasta",
      tags: ["chef-special"],
    },
    {
      storeId: stores[1]._id,
      name: "Tiramisu",
      description: "Espresso-soaked ladyfingers and mascarpone.",
      price: 7.5,
      category: "Dessert",
      tags: ["new"],
    },
    {
      storeId: stores[2]._id,
      name: "Falafel Power Bowl",
      description: "Falafel, quinoa, hummus, and greens.",
      price: 10.99,
      category: "Bowl",
      tags: ["vegan", "gluten-free"],
    },
    {
      storeId: stores[2]._id,
      name: "Chicken Avocado Wrap",
      description: "Grilled chicken wrap with avocado spread.",
      price: 9.99,
      category: "Wrap",
      tags: ["new"],
    },
    {
      storeId: stores[2]._id,
      name: "Berry Protein Smoothie",
      description: "Mixed berries, banana, and whey protein.",
      price: 6.5,
      category: "Drinks",
      tags: ["bestseller"],
    },
  ]);

  await Order.insertMany([
    {
      storeId: stores[0]._id,
      userId: customer._id,
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      items: [
        {
          itemId: menuItems[0]._id,
          name: menuItems[0].name,
          price: menuItems[0].price,
          quantity: 1,
        },
      ],
      totalPrice: menuItems[0].price,
      status: ORDER_STATUS.PENDING,
    },
    {
      storeId: stores[1]._id,
      customerName: "Walk-in Guest",
      phone: "+1555444555",
      address: "15 Sunset Boulevard",
      items: [
        {
          itemId: menuItems[3]._id,
          name: menuItems[3].name,
          price: menuItems[3].price,
          quantity: 2,
        },
      ],
      totalPrice: menuItems[3].price * 2,
      status: ORDER_STATUS.PREPARING,
    },
    {
      storeId: stores[2]._id,
      userId: customer._id,
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      items: [
        {
          itemId: menuItems[6]._id,
          name: menuItems[6].name,
          price: menuItems[6].price,
          quantity: 1,
        },
      ],
      totalPrice: menuItems[6].price,
      status: ORDER_STATUS.READY,
    },
    {
      storeId: stores[0]._id,
      userId: customer._id,
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      items: [
        {
          itemId: menuItems[2]._id,
          name: menuItems[2].name,
          price: menuItems[2].price,
          quantity: 1,
        },
      ],
      totalPrice: menuItems[2].price,
      status: ORDER_STATUS.COMPLETED,
    },
  ]);

  console.log("Seed completed successfully");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
