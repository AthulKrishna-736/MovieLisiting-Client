const Footer = () => {
    return (
        <footer className="w-full bg-black text-white py-10 text-center">
            <p className="font-semibold text-neutral-300">
                © {new Date().getFullYear()} Simple Movie App. Search and save your favorite movies.
            </p>
        </footer>
    )
}

export default Footer;