function Navbar() {
  return (
    <div className="transition ease-in duration-250 p-3 flex justify-between items-center border-b border-bisque shadow-md">
      <div className="flex items-center">
        <img src="paytmlogo.svg" alt="Paytm Logo" className="h-8" />
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-lg font-inter text-black font-semibold hover:text-blue-500">Paytm for Consumers</a>
        <a href="#" className="text-lg font-inter text-black font-semibold hover:text-blue-500">Paytm for Business</a>
        <a href="#" className="text-lg font-inter text-black font-semibold hover:text-blue-500">Investment Relations</a>
        <a href="#" className="text-lg font-inter text-black font-semibold hover:text-blue-500">Company</a>
        <a href="#" className="text-lg font-inter text-black font-semibold hover:text-blue-500">Careers</a>
      </div>
      <div className="flex items-center space-x-2 text-lg font-inter text-black font-semibold hover:text-blue-500" id="lbutton">
        <span>Sign in</span>
        <img src="/loginImg.svg" alt="Login" className="h-6" />
      </div>
    </div>
  );
}

export default Navbar;
