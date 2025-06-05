import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
import p_img16 from './p_img16.png'
import p_img17 from './p_img17.png'
import p_img18 from './p_img18.png'
import p_img19 from './p_img19.png'
import p_img20 from './p_img20.png'
import p_img21 from './p_img21.png'
import p_img22 from './p_img22.png'
import p_img23 from './p_img23.png'
import p_img24 from './p_img24.png'
import p_img25 from './p_img25.png'
import p_img26 from './p_img26.png'
import p_img27 from './p_img27.png'
import p_img28 from './p_img28.png'
import p_img29 from './p_img29.png'
import p_img30 from './p_img30.png'
import p_img31 from './p_img31.png'
import p_img32 from './p_img32.png'
import p_img33 from './p_img33.png'
import p_img34 from './p_img34.png'
import p_img35 from './p_img35.png'
import p_img36 from './p_img36.png'
import p_img37 from './p_img37.png'
import p_img38 from './p_img38.png'
import p_img39 from './p_img39.png'
import p_img40 from './p_img40.png'
import p_img41 from './p_img41.png'
import p_img42 from './p_img42.png'
import p_img43 from './p_img43.png'
import p_img44 from './p_img44.png'
import p_img45 from './p_img45.png'
import p_img46 from './p_img46.png'
import p_img47 from './p_img47.png'
import p_img48 from './p_img48.png'
import p_img49 from './p_img49.png'
import p_img50 from './p_img50.png'
import p_img51 from './p_img51.png'
import p_img52 from './p_img52.png'


import logo from './logo.png'
import hero_img1 from './hero_img1.jpg'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import logo_fashionify from './logo_fashionify.png'
import profile_image from './profile-icon.webp'

export const assets = {
  logo,
  hero_img,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_dull_icon,
  star_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
  hero_img1,
  logo_fashionify,
  profile_icon
}

export const products = [

  {
    _id: "item001",
    name: "Sony Alpha A7 III Mirrorless Camera",
    description: "A full-frame mirrorless camera with 24.2 MP resolution, 4K recording, and advanced autofocus system.",
    rent_per_day: 500,
    image: [p_img1, p_img2_1, p_img2_2],
    category: "Electronics",
    subcategory: "Camera",
    quantity: 3,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "The renter is responsible for any physical damage during the rental period. ID proof required.",
    deposit: 7000,
    return_policy: "Returns are accepted only if the product has manufacturing defects reported within 24 hours of pickup.",

  },
  {
    _id: "item002",
    name: "MacBook Pro 16-inch (M1 Pro)",
    description: "A high-performance laptop with Apple M1 Pro chip, 16GB RAM, and 512GB SSD. Ideal for video editing and software development.",
    rent_per_day: 800,
    image: [p_img3, p_img4],
    category: "Electronics",
    subcategory: "Laptops",
    quantity: 2,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Physical damage will lead to additional charges. The laptop must be returned with all accessories.",
    deposit: 15000,
    return_policy: "Refund is available only for rental cancellations before pickup.",

  },
  {
    _id: "item003",
    name: "PlayStation 5 Console",
    description: "Sony’s latest gaming console with ultra-fast SSD, ray tracing, and 4K gaming experience.",
    rent_per_day: 600,
    image: [p_img5, p_img6],
    category: "Electronics",
    subcategory: "Gaming Equipment",
    quantity: 4,
    available_for_sale: true,
    sale_price: 15000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Controller damage will be charged separately. Online account login details must not be changed.",
    deposit: 8000,
    return_policy: "Returns are not accepted once rented. Sale returns within 7 days for manufacturing defects only.",

  },
  {
    _id: "item004",
    name: "Adidas Cricket Bat (Grade 1 Willow)",
    description: "Top-quality English willow cricket bat used by professionals for international matches.",
    rent_per_day: 150,
    image: [p_img7, p_img8],
    category: "Sports",
    subcategory: "Cricket",
    quantity: 6,
    available_for_sale: true,
    sale_price: 5000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Only light wear and tear allowed. Bat must be returned in proper condition.",
    deposit: 2000,
    return_policy: "Returns not accepted once used in matches. Sale returns within 3 days for manufacturing defects.",
  },
  {
    _id: "item005",
    name: "Nike Football - FIFA Approved",
    description: "Professional match football approved by FIFA. Best for tournaments and training.",
    rent_per_day: 100,
    image: [p_img9, p_img10],
    category: "Sports",
    subcategory: "Football",
    quantity: 10,
    available_for_sale: true,
    sale_price: 2000,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "The ball should not be used on rough surfaces. Loss of air due to puncture is chargeable.",
    deposit: 500,
    return_policy: "Refunds only available for defective balls before first use.",
  },
  {
    _id: "item006",
    name: "Adjustable Dumbbells (Pair, 10kg each)",
    description: "High-quality rubber-coated adjustable dumbbells for home gym workouts.",
    rent_per_day: 80,
    image: [p_img11, p_img12],
    category: "Sports",
    subcategory: "Gym Equipment",
    quantity: 5,
    available_for_sale: true,
    sale_price: 3000,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Must be returned in clean condition. Rust or weight loss will incur charges.",
    deposit: 1000,
    return_policy: "Refunds only if damage is reported within 24 hours of delivery.",
  },
  {
    _id: "item007",
    name: "GoPro Hero 10 Action Camera",
    description: "Waterproof 5K camera with high frame rate for adventure sports recordings.",
    rent_per_day: 300,
    image: [p_img13, p_img14],
    category: "Electronics",
    subcategory: "Camera",
    quantity: 3,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Water damage is not covered in rental. Loss of accessories will be charged.",
    deposit: 5000,
    return_policy: "Returns available for defective units only within 12 hours of pickup.",
  },
  {
    _id: "item008",
    name: "Dell XPS 15 Laptop",
    description: "A premium ultrabook with a 4K display, Intel Core i9 processor, and 1TB SSD.",
    rent_per_day: 900,
    image: [p_img15, p_img16],
    category: "Electronics",
    subcategory: "Laptops",
    quantity: 2,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Screen damage will be charged separately. The laptop must be returned formatted.",
    deposit: 20000,
    return_policy: "Refund for rental cancellations only before pickup.",
  },
  {
    _id: "item009",
    name: "Xbox Series X Gaming Console",
    description: "Microsoft’s latest gaming console with Game Pass Ultimate and 120Hz support.",
    rent_per_day: 550,
    image: [p_img17, p_img18],
    category: "Electronics",
    subcategory: "Gaming Equipment",
    quantity: 4,
    available_for_sale: true,
    sale_price: 15000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740239817000,
    available_till: 1742581800000,
    terms_n_conditions: "Any modification or tampering with the device will lead to penalties.",
    deposit: 9000,
    return_policy: "Returns only for hardware failures within 3 days of delivery.",

  },
  {
    _id: "item010",
    name: "Canon RF 24-70mm f/2.8L IS USM Lens",
    description: "A high-quality zoom lens perfect for professional photography and videography.",
    rent_per_day: 400,
    image: [p_img19, p_img20],
    category: "Electronics",
    subcategory: "Camera",
    quantity: 2,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740456217000,
    available_till: 1742789817000,
    terms_n_conditions: "Lens should be returned without scratches or internal dust issues.",
    deposit: 6000,
    return_policy: "Returns accepted only if the lens is found defective within 24 hours of delivery.",

  },
  {
    _id: "item011",
    name: "HP Spectre x360 Convertible Laptop",
    description: "A sleek and powerful 2-in-1 laptop with Intel Core i7 and 16GB RAM.",
    rent_per_day: 700,
    image: [p_img21, p_img22],
    category: "Electronics",
    subcategory: "Laptops",
    quantity: 3,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740487217000,
    available_till: 1742809817000,
    terms_n_conditions: "Laptop must be returned with all accessories in working condition.",
    deposit: 12000,
    return_policy: "No refunds once rented. Cancellations before pickup are allowed.",

  },
  {
    _id: "item012",
    name: "Nintendo Switch OLED",
    description: "A hybrid gaming console with a stunning OLED screen and detachable controllers.",
    rent_per_day: 450,
    image: [p_img23, p_img24],
    category: "Electronics",
    subcategory: "Gaming Equipment",
    quantity: 5,
    available_for_sale: true,
    sale_price: 10000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740508217000,
    available_till: 1742830817000,
    terms_n_conditions: "Any software modifications or unauthorized repairs will void the rental agreement.",
    deposit: 7500,
    return_policy: "Returns only accepted for hardware issues within 48 hours.",

  },
  {
    _id: "item013",
    name: "Kookaburra Cricket Kit",
    description: "A complete professional cricket kit including bat, pads, gloves, and helmet.",
    rent_per_day: 200,
    image: [p_img25, p_img26],
    category: "Sports",
    subcategory: "Cricket",
    quantity: 4,
    available_for_sale: true,
    sale_price: 8000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740539217000,
    available_till: 1742851817000,
    terms_n_conditions: "Kit must be returned in good condition. Any loss or damage will incur additional charges.",
    deposit: 3000,
    return_policy: "Refund only applicable for manufacturer defects before use.",
  },
  {
    _id: "item014",
    name: "Puma Official Match Football",
    description: "A premium quality football approved for international matches.",
    rent_per_day: 90,
    image: [p_img27, p_img28],
    category: "Sports",
    subcategory: "Football",
    quantity: 8,
    available_for_sale: true,
    sale_price: 1500,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740560217000,
    available_till: 1742872817000,
    terms_n_conditions: "The ball should not be used on concrete surfaces. Punctures are chargeable.",
    deposit: 500,
    return_policy: "Returns only accepted for manufacturing defects before first use.",

  },
  {
    _id: "item015",
    name: "Bowflex Adjustable Dumbbells (24kg each)",
    description: "Premium adjustable dumbbells for serious weight training and home workouts.",
    rent_per_day: 120,
    image: [p_img29, p_img30],
    category: "Sports",
    subcategory: "Gym Equipment",
    quantity: 6,
    available_for_sale: true,
    sale_price: 5000,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740581217000,
    available_till: 1742893817000,
    terms_n_conditions: "Weights must be returned with no rust or visible damage.",
    deposit: 2500,
    return_policy: "Refunds available only if reported defective within 12 hours of delivery.",

  },
  {
    _id: "item016",
    name: "DJI Mavic Air 2 Drone",
    description: "A high-performance drone with 4K video recording and AI flight assistance.",
    rent_per_day: 650,
    image: [p_img31, p_img32],
    category: "Electronics",
    subcategory: "Camera",
    quantity: 3,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740602217000,
    available_till: 1742914817000,
    terms_n_conditions: "Flight logs will be checked for any crashes or unauthorized modifications.",
    deposit: 10000,
    return_policy: "Returns only for internal defects within 24 hours of rental start.",

  },
  {
    _id: "item017",
    name: "Asus ROG Zephyrus Gaming Laptop",
    description: "A high-end gaming laptop with RTX 3080 graphics and a 300Hz display.",
    rent_per_day: 900,
    image: [p_img33, p_img34],
    category: "Electronics",
    subcategory: "Laptops",
    quantity: 2,
    available_for_sale: false,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740623217000,
    available_till: 1742935817000,
    terms_n_conditions: "Laptop should be returned without scratches. Any hardware damage will be chargeable.",
    deposit: 20000,
    return_policy: "Refund available only for pre-rental cancellations.",

  },
  {
    _id: "item018",
    name: "Oculus Quest 2 VR Headset",
    description: "A standalone VR headset with immersive graphics and wireless hand tracking.",
    rent_per_day: 500,
    image: [p_img35, p_img36],
    category: "Electronics",
    subcategory: "Gaming Equipment",
    quantity: 5,
    available_for_sale: true,
    sale_price: 20000,
    available_for_rent: true,
    TopRental: true,
    date_listed: 1740644217000,
    available_till: 1742956817000,
    terms_n_conditions: "Must be returned with original lenses and controllers intact.",
    deposit: 8000,
    return_policy: "Returns only for manufacturing defects within 48 hours of rental.",

  },
  {
    _id: "item019",
    name: "Spalding Official NBA Basketball",
    description: "A premium basketball designed for professional and indoor play.",
    rent_per_day: 85,
    image: [p_img37, p_img38],
    category: "Sports",
    subcategory: "Football",
    quantity: 7,
    available_for_sale: true,
    sale_price: 1200,
    available_for_rent: true,
    TopRental: false,
    date_listed: 1740665217000,
    available_till: 1742977817000,
    terms_n_conditions: "Ball must be used indoors. Outdoor use voids refund policy.",
    deposit: 600,
    return_policy: "Returns accepted only for defects before first use.",

  }

]