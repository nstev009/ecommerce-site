// Headphones images
import headphones1_img from "./headphones1.jpg";
import headphones2_img from "./headphones2.png";
import headphones3_img from "./headphones3.jpg";

// Keyboard images
import keyboard1_img from "./keyboard1.jpg";
import keyboard2_img from "./keyboard2.jpg";
import keyboard3_img from "./keyboard3.jpg";

// Laptop images
import laptop1_img from "./laptop1.jpg";
import laptop2_img from "./laptop2.jpg";
import laptop3_img from "./laptop3.jpg";

// Monitor images
import monitor1_img from "./monitor1.jpg";
import monitor2_img from "./monitor2.jpg";
import monitor3_img from "./monitor3.jpg";

// Mouse images
import mouse1_img from "./mouse1.jpg";
import mouse2_img from "./mouse2.jpg";
import mouse3_img from "./mouse3.jpeg";

// TV images
import tv1_img from "./tv1.jpg";
import tv2_img from "./tv2.jpg";
import tv3_img from "./tv3.jpg";

let all_products = [
    {
        id: 1,
        name: "Sony WH-CH720N Noise Cancelling Wireless Headphones",
        brand: "Sony",
        price: 249.99,
        discount: 10,
        colour: "Black",
        category: "Headphones",
        image: headphones1_img,
        description: "High-quality over-ear headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Sennheiser Momentum 4 Wireless Noise Cancelling Headphones",
        brand: "Sennheiser",
        price: 499.95,
        discount: 5,
        category: "Headphones",
        image: headphones2_img,
        description: "Lightweight on-ear headphones with great sound quality."
    },
    {
        id: 3,
        name: "JBL Tune 770NC - Adaptive Noise Cancelling with Smart Ambient Wireless Over-Ear Headphones",
        brand: "JBL",
        price: 189.98,
        discount: 0,
        category: "Headphones",
        image: headphones3_img,
        description: "Compact in-ear headphones with a comfortable fit."
    },
    {
        id: 4,
        name: "Typewriter Keyboard",
        brand: "Adventurers",
        price: 104.99,
        discount: 10,
        colour: "Black",
        category: "Keyboards",
        image: keyboard1_img,
        description: "Mechanical keyboard with customizable RGB lighting."
    },
    {
        id: 5,
        name: "Keychron V5 Max Wireless Custom Knob Mechanical Keyboard",
        brand: "Keychron",
        colour: "Black",
        price: 155.99,
        discount: 0,
        category: "Keyboards",
        image: keyboard2_img,
        description: "Ergonomic keyboard designed for comfort during long typing sessions."
    },
    {
        id: 6,
        name: "SteelSeries Apex Pro Mini Wireless HyperMagnetic Gaming Keyboard",
        brand: "SteelSeries",
        colour: "Black",
        price: 299.99,
        discount: 0,
        category: "Keyboards",
        image: keyboard3_img,
        description: "Compact wireless keyboard perfect for travel."
    },
    {
        id: 7,
        name: "HP Stream 14' HD Laptop",
        brand: "HP",
        colour: "Silver",
        price: 429.00,
        discount: 50,
        category: "Laptops",
        image: laptop1_img,
        description:
            "Powerful laptop with a high-resolution display and long battery life."
    },
    {
        id: 8,
        name: "Lenovo Thinkpad E16 Business Laptop",
        brand: "Lenovo",
        colour: "Black",
        price: 1594.00,
        discount: 30,
        category: "Laptops",
        image: laptop2_img,
        description:
            "Sleek ultrabook with fast performance and lightweight design."
    },
    {
        id: 9,
        name: "ACEMAGIC Laptop Computer AMD Ryzen 7 5700U Windows Laptop",
        brand: "ACEMAGIC",
        colour: "Silver",
        price: 699.99,
        discount: 20,
        category: "Laptops",
        image: laptop3_img,
        description:
            "Affordable laptop suitable for everyday tasks and entertainment."
    },
    {
        id: 10,
        name: "KOORUI 27 inch Gaming Monitor",
        brand: "KOORUI",
        colour: "Black",
        price: 209.99,
        discount: 15,
        category: "Monitors",
        image: monitor1_img,
        description: "4K Ultra HD monitor with vibrant colors and sharp clarity."
    },
    {
        id: 11,
        name: "Sealan 34 inch Ultrawide Curved Computer Gaming Monitor",
        brand: "Sealan",
        colour: "Black",
        price: 269.99,
        discount: 10,
        category: "Monitors",
        image: monitor2_img,
        description: "Gaming monitor with high refresh rate and low input lag."
    },
    {
        id: 12,
        name: "LG Ultrafine 32UP83AK-W 32” 4K UHD Monitor",
        brand: "LG",
        colour: "Black",
        price: 599.99,
        discount: 5,
        category: "Monitors",
        image: monitor3_img,
        description: "Budget-friendly monitor perfect for office work and browsing."
    },
    {
        id: 13,
        name: "GravaStar Mercury X Pro Wireless Gaming Mouse",
        brand: "GravaStar",
        colour: "Black",
        price: 193.83,
        discount: 20,
        category: "Mice",
        image: mouse1_img,
        description: "Ergonomic wireless mouse with precision tracking."
    },
    {
        id: 14,
        name: "Logitech MX Vertical Wireless Mouse",
        brand: "Logitech",
        colour: "Silver",
        price: 139.28,
        discount: 0,
        category: "Mice",
        image: mouse2_img,
        description: "Gaming mouse with customizable buttons and RGB lighting."
    },
    {
        id: 15,
        name: "Logitech G305 12000 DPI Wireless Optical Gaming Mouse",
        brand: "Logitech",
        colour: "White",
        price: 49.99,
        discount: 15,
        category: "Mice",
        image: mouse3_img,
        description: "Compact travel mouse with reliable optical sensor."
    },
    {
        id: 16,
        name: "SAMSUNG 65-Inch QLED Q8F 4K Smart TV",
        brand: "SAMSUNG",
        colour: "Black",
        price: 1298.00,
        discount: 25,
        category: "TVs",
        image: tv1_img,
        description: "65-inch Smart TV with 4K resolution and streaming apps."
    },
    {
        id: 17,
        name: "LG 77-Inch C4 OLED evo 4K Smart TV",
        brand: "LG",
        colour: "Black",
        price: 3196.98,
        discount: 30,
        category: "TVs",
        image: tv2_img,
        description: "77-inch LED TV with HDR support and crystal clear picture."
    },
    {
        id: 18,
        name: "LG C3 OLED evo 65-Inch 4K Smart TV",
        brand: "LG",
        colour: "Black",
        price: 1997.99,
        discount: 10,
        category: "TVs",
        image: tv3_img,
        description: "65-inch Full HD TV perfect for bedrooms and small spaces."
    }
]

export default all_products;