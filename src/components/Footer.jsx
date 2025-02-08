// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer bg-base-200 text-base-content p-10">
//         <nav>
//           <h6 className="footer-title">Services</h6>
//           <a className="link link-hover">Branding</a>
//           <a className="link link-hover">Design</a>
//           <a className="link link-hover">Marketing</a>
//           <a className="link link-hover">Advertisement</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Company</h6>
//           <a className="link link-hover">About us</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Jobs</a>
//           <a className="link link-hover">Press kit</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Legal</h6>
//           <a className="link link-hover">Terms of use</a>
//           <a className="link link-hover">Privacy policy</a>
//           <a className="link link-hover">Cookie policy</a>
//         </nav>
//         <form>
//           <h6 className="footer-title">Newsletter</h6>
//           <fieldset className="form-control w-80">
//             <label className="label">
//               <span className="label-text">Enter your email address</span>
//             </label>
//             <div className="join">
//               <input
//                 type="text"
//                 placeholder="username@site.com"
//                 className="input input-bordered join-item"
//               />
//               <button className="btn btn-primary join-item">Subscribe</button>
//             </div>
//           </fieldset>
//         </form>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10">
        <div>
          <h6 className="footer-title">You are Most Welcome</h6>
          <Link
            to="/"
            className=" bg-white p-3 text-blue-600 text-3xl font-bold rounded-full"
          >
            Edu_Management
          </Link>
        </div>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/about-us" className="link link-hover">
            About Us
          </Link>
          <Link to="/contact-us" className="link link-hover">
            Contact Us
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms-of-use" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/privacy-policy" className="link link-hover">
            Privacy policy
          </Link>
          <Link to="/cookie-policy" className="link link-hover">
            Cookie policy
          </Link>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn bg-blue-500 text-white join-item">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
