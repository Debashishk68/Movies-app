const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 className="text-green-400 font-semibold mb-2">tMovies</h4>
        <p className="text-sm">Stream your favorite content, anytime, anywhere.</p>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1 text-sm">
          <li className="hover:text-green-400 cursor-pointer">Home</li>
          <li className="hover:text-green-400 cursor-pointer">Movies</li>
          <li className="hover:text-green-400 cursor-pointer">TV Series</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">Help</h4>
        <ul className="space-y-1 text-sm">
          <li className="hover:text-green-400 cursor-pointer">FAQ</li>
          <li className="hover:text-green-400 cursor-pointer">Contact Us</li>
          <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-2">Follow Us</h4>
        <ul className="space-y-1 text-sm">
          <li className="hover:text-green-400 cursor-pointer">Instagram</li>
          <li className="hover:text-green-400 cursor-pointer">Twitter</li>
          <li className="hover:text-green-400 cursor-pointer">Facebook</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
