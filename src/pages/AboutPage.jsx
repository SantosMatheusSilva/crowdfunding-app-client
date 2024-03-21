import logo from '../assets/logo.png';
import abstract from '../assets/abstract.svg';
import community from '../assets/community.svg';
import onbording from '../assets/onbording.svg';

function AboutPage () {

    return ( //className=" flextext-center mb-10 mt-10   "
     <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
      <div className="flex flex-row justify-center mb-20">
      <div>
            <img src={logo} alt="logo" className="max-w-64 max-h-64"/>
        </div>
        <div>
        <h1 className="text-9xl">HOPE </h1>
            <h2 className="text-3xl">Charity Crowdfunding Platform</h2>
        </div>
      </div>
        <div className=" flextext-center mb-10 mt-10   p-4 flex flex-row gap-4 ">
            <img src={community} alt=""  className="max-w-96 max-h-96"/>
            <div className="border-4 border-sky-300 p-4 rounded-md">
            <p>HOPE offers a wide range of causes for users to support, including dreams, education, health, emergencies, and more. We believe that every cause, no matter how big or small, deserves a chance to be supported.</p>
            <p>Our platform allows users to create their own campaigns, giving them the opportunity to champion causes that are close to their hearts. Whether it's a personal project, a community initiative, or a global campaign, HOPE provides the tools and support needed to bring these campaigns to life.</p>
            <p>In addition to user-created campaigns, HOPE also partners with local non-profit institutions, providing users with the opportunity to discover and support impactful organizations in their own communities. Through these partnerships, we aim to amplify the impact of grassroots efforts and support the invaluable work being done by local organizations.</p>
            <p>We prioritize transparency and accountability in everything we do. From ensuring that funds are securely transferred to the intended recipients to providing regular updates on the progress of campaigns, we strive to maintain the highest standards of integrity and trust.</p>
            </div>
        </div>
        <div>
            <h2>Join Us</h2>
            <p>
            Whether you're passionate about helping individuals achieve their dreams, ensuring access to quality education, promoting health and wellness, or responding to emergencies, HOPE provides a platform for you to make a difference. Join us in our mission to spread hope and create positive change in the world. Together, we can make an impact that lasts a lifetime.
            </p>
        </div>
        <div className=" flextext-center mb-10 mt-10  p-4 flex flex-row-reverse gap-4 ">
            <div>
            <img src={onbording} alt="" className="max-w-96 max-h-96"/>
            </div>
            <div className="border-4 border-sky-300 p-4 rounded-md">
            <h2>How it Works</h2>
            <p>Creating a funding campaign is as simple as filling out a form with some key information. Just select the cause you're passionate about, set a realistic goal, and choose a deadline for your campaign. Remember, honesty is key here – accurately representing your cause and setting achievable goals will help build trust with potential donors.</p>
            <p>Once your campaign is live, you'll have access to a suite of tools to track its progress and engage with your supporters. Share updates, express gratitude, and inspire others to join your cause. Remember, every donation, no matter how big or small, has the power to make a difference.</p>
            <p>And if you're not ready to create your own campaign just yet, you can explore ongoing campaigns and discover local non-profit organizations to support. With HOPE, you have the power to choose where your generosity goes and the assurance that your contributions are making a real impact.</p>
            <p>So sign in, create a campaign with integrity, and let your good will shine through. Together, we can spread hope and make the world a better place, one donation at a time.</p>
            </div>
        </div>
        <div className=" flextext-center mb-10 mt-10 border-4 border-sky-500 p-4  ">
            <h2>Our Team</h2>
            <p>this section about our team</p>
        </div>
        

     </article>
    )
}

export default AboutPage; 