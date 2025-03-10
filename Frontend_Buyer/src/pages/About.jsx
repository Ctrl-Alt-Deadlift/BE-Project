import Title from "../components/Title.jsx"
import { assets } from "../assets/assets.js"
import NewsLetterBox from "../components/NewsLetterBox.jsx"
const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome to Fashionify, where bold meets sustainable! We're a Gen-Z clothing brand redefining fashion through vibrant, inclusive designs that celebrate individuality. At Fashionify, we believe clothing is more than what you wear—it’s how you express your story. By merging the latest trends with eco-conscious practices, we aim to empower self-expression while making a positive impact on the world.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission is to revolutionize the fashion industry by championing sustainability without compromising style. We strive to create a world where everyone feels seen, valued, and inspired to embrace their uniqueness. Through innovative designs and ethical practices, we’re committed to building a community that celebrates diversity and nurtures the planet for generations to come.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Quality Assurance</b>
          <p className="text-gray-600">At Fashionify, we prioritize delivering the highest quality products. Each piece is crafted with precision and care, ensuring durability, comfort, and unmatched style. We use premium materials and sustainable practices to meet and exceed your expectations. </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Convinience</b>
          <p className="text-gray-600">We believe shopping should be effortless and enjoyable. From an intuitive online experience to prompt delivery, Fashionify ensures that your journey with us is smooth and hassle-free, bringing bold fashion right to your doorstep. </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Exceptional Customer Service</b>
          <p className="text-gray-600">Our customers are at the heart of everything we do. Fashionify is committed to providing personalized support and prompt resolutions to your queries, ensuring you always feel valued and heard. </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About