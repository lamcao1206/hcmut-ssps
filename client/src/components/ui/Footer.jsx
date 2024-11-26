import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h5 className="text-xl font-semibold mb-4">HCMUT SPSS</h5>
            <img src="/src/assets/hcmut.png" alt="Logo" className="h-[100px] mx-auto md:mx-0 mb-4" />
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h5 className="text-xl font-semibold mb-4">Website</h5>
            <ul className="list-none space-y-2">
              <li>
                <a href="/" className="text-white hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h5 className="text-xl font-semibold mb-4">Contact</h5>
            <p className="mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              lam.cao1206@hcmut.edu.vn
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              84 976 454 287
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              268 Ly Thuong Kiet, District 10, Ho Chi Minh City
            </p>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="mt-6 text-center text-gray-400">&copy; {new Date().getFullYear()} HCMUT SPSS. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
