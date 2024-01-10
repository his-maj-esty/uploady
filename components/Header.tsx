import React from 'react'
import { ThemeToggle } from './ui/ThemeToggle';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
    return (
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <div className="bg-blue-500 text-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
          </Link>
          <div className="font-bold">Uploady</div>
        </div>
        <div className="flex items-center space-x-2 px-3">
          <div>
            <ThemeToggle />
          </div>
          <div>
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
            <SignedOut>
              <SignInButton></SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    );
}

export default Header