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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, doloribus aliquid labore eius necessitatibus quisquam. Officiis sequi earum optio! Asperiores!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, eligendi ea. Aperiam aliquid iste ullam, dignissimos eligendi magni laboriosam soluta minus a repudiandae voluptatibus ut?</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod quas error laboriosam nostrum odit, harum facilis numquam incidunt iure. Quaerat consequatur facere odit perspiciatis error earum mollitia necessitatibus vel saepe quidem cum sequi, sint pariatur molestiae quis dolore ipsam facilis.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Quality Assurance</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, exercitationem! Lorem ipsum dolor sit amet. </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Convinience</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, exercitationem! Lorem ipsum dolor sit amet. </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-xl">Exceptional Customer Service</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, exercitationem! Lorem ipsum dolor sit amet. </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About