import SearchIcon from "../image/search.png";
import { AiFillCloseCircle } from "react-icons/ai";
import classNames from "classnames";
import { useState } from "react";

export default function Search() {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-[268px]  relative ">
            <span className={classNames({
                "absolute text-[#8e8e8e] pointer-events-none top-0 left-0 h-9 w-9 flex items-center justify-center": true,
                "hidden": open
            })}>
                <img className="w-[16px]" src={SearchIcon} alt="Search" />
            </span>
            <input
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className="h-9 pl-9 w-full focus:pl-3 outline-none rounded bg-[#efefef]"
                type="text"
                placeholder="Search"
            />
            {open && (
                <button
                    onClick={() => setOpen(false)}
                    className="absolute text-[#c7c7c7] top-0 right-0 w-9 h-9 flex items-center justify-center"
                >
                    <AiFillCloseCircle />
                </button>
            )}
        </div>
    );
}
