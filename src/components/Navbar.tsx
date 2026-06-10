const Navbar = () => {
    return (
        <>
            <div className="dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4">
                {/* Logo */}
                <div className="sm:text-2xl text-xl cursor-pointer hover:text-yellow-200 duration-200">
                    <i className="fa-solid fa-gamepad"></i>
                </div>
                {/*Search Bar*/}
                <div className="sm:grow flex items-center justify-center dark:bg-neutral-800 h-8 sm:px-3 p-3 sm:rounded-2xl rounded-full sm:max-w-4xl sm:m-0 ml-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="grow sm:block hidden"
                    />
                    <button className="sm:border-l border-neutral-500 sm:p-1 cursor-pointer hover:text-yellow-200 duration-200">
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </button>
                </div>
                {/*Theme Change*/}
                <button className="h-8 hover:text-yellow-200 duration-200 cursor-pointer p-3 bg-neutral-800 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-moon"></i>
                </button>
            </div>
        </>
    );
};

export default Navbar;
