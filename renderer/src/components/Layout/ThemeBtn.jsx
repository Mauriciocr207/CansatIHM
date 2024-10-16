import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { string } from "prop-types";


export function ThemeBtn({className}) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(localStorage.getItem('theme') === "dark");
    }, []);

    useEffect(()=> {
        if(darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    function handleThemeSwitch() {
        setDarkMode(prev => {
            localStorage.setItem('theme', !prev ? 'dark':'light');
            return !prev
        });
    }
    
    return <>
        <div onClick={handleThemeSwitch} className={`${className} cursor-pointer`}>
            {darkMode ? (<BsFillMoonStarsFill/>):(<MdOutlineWbSunny/>)}
        </div>
    </>
}

ThemeBtn.propTypes = {
    className: string
}