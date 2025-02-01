"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const Select = ({ options, selected, queryString, url }: { options: {name:string, value:string}[], selected: string, queryString?: string, url?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: {name:string, value:string}) => {
        setSelectedOption(option.name);
            setIsOpen(false);
        if (url) {
            router.push(`/collections/${option.value}`)

        } else if (queryString) {

            const params = new URLSearchParams(searchParams?.toString());
            params.set(queryString, option.value);
            router.push(`?${params.toString()}`, { scroll: false });
        }
    };



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className="flex items-center w-full border border-[#bfbfbf] justify-between px-4 py-3 cursor-pointer"
            >
                {selectedOption}
                <IoMdArrowDropdown className="text-[16px]" />
            </div>

            {isOpen && (
                <ul className="absolute left-0 w-full mt-2 border border-[#bfbfbf] bg-white z-10">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
