import React from "react";
// import { Link } from "react-router-dom";
// import { PROFILEKEY } from "../../Constants";
// import useLocalStorage from "../../hooks/useLocalStorage";
// import useDropdown from "../../hooks/useDropdown";

const Nav = () => {
  return (
    <>
      <div className="border-b border-gray-300 ">
        <div className="flex w-full px-10 py-5 lg:w-4/6 flex-nowrap dark:bg-coolGray-800 dark:text-coolGray-100">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
    </>
  );
};

// const UserDropdown = () => {
//   const [containerRef, isOpen, open, close] = useDropdown();
//   const { data } = useLocalStorage(PROFILEKEY);

//   return (
//     <div className="relative border rounded cursor-pointer" ref={containerRef}>
//       <div
//         aria-controls={isOpen ? "menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={isOpen ? "true" : undefined}
//         onClick={open}
//         className="px-6 py-2 "
//       >
//         {user?.userName}
//       </div>
//       <div
//         className={`absolute z-10 left-0 w-full divide-y grid top-full mt-1 shadow-md border rounded bg-white ${
//           isOpen ? "block" : "hidden"
//         }`}
//         onClick={close}
//       >
//         <DropdownItem link="/user/profile" label="Profile" />
//         <DropdownItem link="/user/bookings" label="Bookings" />
//         <DropdownItem link="/user/reviews" label="Reviews" />
//         <DropdownItem link="/user/enquiries" label="Enquiries" />
//         <div
//           className="flex items-center justify-between px-3 py-2 transition duration-300 hover:text-red-500 hover:font-bold"
//           onClick={clearUser}
//         >
//           <div>Logout</div>
//           <AiOutlinePoweroff size={18} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const DropdownItem = ({ link, label }) => {
//   return (
//     <Link to={link}>
//       <div className="px-3 py-2 transition duration-300 hover:bg-red-50">
//         {label}
//       </div>
//     </Link>
//   );
// };

export default Nav;
