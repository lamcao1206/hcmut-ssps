import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap h-[]">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">HCMUT SPSS</h5>
            <img src="/src/assets/hcmut.png" alt="Logo" className="h-[100px] mx-auto md:mx-0 mb-2" />
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Website</h5>
            <ul className="list-none">
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
          <div className="w-full md:w-1/3 text-left">
            <h5 className="text-lg font-semibold">Contact</h5>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              lam.cao1206@hcmut.edu.vn
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              84 976 454 287
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              268 Ly Thuong Kiet, District 10, Ho Chi Minh City
            </p>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        <div className="mt-6 text-center text-gray-500">&copy; {new Date().getFullYear()} HCMUT SPSS. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
