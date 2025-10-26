import Title from "../components/Title.jsx"
import { assets_new } from "../assets/assets_new.js"

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets_new.aboutus} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome to Rensell, where smart shopping meets sustainability! We're an innovative e-commerce platform that empowers you to rent or buy quality products with ease. At Rensell, we believe shopping is more than just transactions—it's about making conscious choices that fit your lifestyle. By connecting buyers and sellers through flexible rental and purchase options, we aim to promote sustainable consumption while making quality products accessible to everyone.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission is to revolutionize shopping in India by blending the freedom of renting with the certainty of buying. We strive to create a platform where anyone can access, use, and enjoy quality products—without waste or hassle. Through verified goods, seamless experiences, and a commitment to sustainability, we're building a community where everyone can save money, reduce environmental impact, and embrace a smarter way to shop and share.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Quality Assurance</b>
          <p className="text-gray-600">At Rensell, we prioritize delivering verified, high-quality products. Each listing is carefully reviewed to ensure authenticity, functionality, and value. Whether you're renting or buying, we guarantee products that meet your expectations and provide real worth for your money.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Convenience</b>
          <p className="text-gray-600">We believe shopping should be effortless and flexible. From an intuitive browsing experience to secure transactions and prompt delivery, Rensell ensures that renting or buying products is smooth and hassle-free. Get what you need, when you need it, right at your doorstep.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Exceptional Customer Service</b>
          <p className="text-gray-600">Our users are at the heart of everything we do. Rensell is committed to providing personalized support, quick resolutions, and transparent communication throughout your journey. Whether you're a buyer, seller, or renter, you'll always feel valued and supported.</p>
        </div>
      </div>
    </div>
  )
}

export default About
