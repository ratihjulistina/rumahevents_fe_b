/** @format */
"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Categoryitem from "./categoryItem";

export default function Navbar() {
  return (
    <>
      <div className="hidden h-[32px] md:flex justify-between items-center bg-purple-900 text-white">
        <div className="flex items-center justify-between gap-5 px-[8px]">
          <Link
            href={"#"}
            className="flex items-center gap-1 px-2 hover:text-[#581c87] hover:bg-[#e2caf0] hover:rounded-full"
          >
            <div>
              <Image
                src={"/download-icon.svg"}
                alt="download-icon"
                height={15}
                width={15}
                className="object-center"
              />
            </div>
            <div>Download Aplikasi Rumah Events</div>
          </Link>
          <Link
            href={"#"}
            className="flex items-center gap-1 px-2 hover:text-[#581c87] hover:bg-[#e2caf0] hover:rounded-full"
          >
            <div>
              <Image
                src={"/bantuan-icon.svg"}
                alt="bantuan-icon"
                height={15}
                width={15}
                className="object-center"
              />
            </div>
            <div>Bantuan 24/7</div>
          </Link>
        </div>
        <div className="flex justify-end items-center gap-5 px-[8px]">
          <Link
            href={"#"}
            className="px-2  hover:text-[#581c87] hover:bg-[#e2caf0] hover:rounded-full"
          >
            Tentang Kami
          </Link>
          <Link
            href={"#"}
            className="px-2 hover:text-[#581c87] hover:bg-[#e2caf0] hover:rounded-full"
          >
            Jadi Rumah Events Creator
          </Link>
          <Link
            href={"#"}
            className="px-2 hover:text-[#581c87] hover:bg-[#e2caf0] hover:rounded-full"
          >
            Tiket Rewards
          </Link>
        </div>
      </div>
      <div className="w-full sticky top-0 z-10 ">
        {/* <SessionProvider> */}
        <NavbarDesktop />
        <NavbarMobile />
        {/* </SessionProvider> */}

        <div className="flex p-2 overflow-x-auto justify-center w-full gap-6 md:justify-center items-center bg-purple-300 shadow-lg outline-1 ">
          <Link href="#" className="text-nowrap hover:text-[#ed3293]">
            Art
          </Link>
          <Link href="#" className="text-nowrap hover:text-[#ed3293]">
            Music and Theater
          </Link>
          <Link href="#" className="text-nowrap hover:text-[#ed3293]">
            Bussiness
          </Link>
          <Link href="#" className="text-nowrap hover:text-[#ed3293]">
            Education and Training
          </Link>
          <Link href="#" className="text-nowrap hover:text-[#ed3293]">
            Free
          </Link>
          {/* <Categoryitem title="Art" /> */}
        </div>
      </div>
    </>
  );
}

function NavbarDesktop() {
  // const router = useRouter();
  // const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        router.push(`/?q=${query}`, { scroll: false });
      }
      // else {
      //   router.push("/", { scroll: false });
      // }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, router]);
  const handleBlur = () => {
    setTimeout(() => {
      setQuery("");
    }, 200);
  };

  return (
    <>
      <div className="hidden md:flex pt-[16px] items-center justify-between px-[32px] w-full bg-purple-300 gap-2">
        <Link href={"/"}>
          <Image src="/logo.png" width={105} height={80} alt="logo"></Image>
        </Link>
        <div className=" pr-[7px] flex bg-[#f0f0f0] w-[55%] rounded-md mx-8 h-[38px] min-h-max my-auto">
          <div className="flex justify-center items-center w-full h-full  mr-0">
            <div className="flex justify-center items-center w-[38px] h-[38px] bg-purple-900 rounded-l-md">
              <Image
                src="/search-icon.svg"
                alt="search-icon"
                width={16}
                height={16}
              />
            </div>

            <input
              type="text"
              placeholder="Cari event menarikmu disini"
              className=" bg-[#f0f0f0] w-full h-full focus:outline-offset-1 px-4"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <Link
          href={"/create-event"}
          className="flex min-w-max justify-center items-center font-semibold bg-purple-900 px-3 py-2 gap-2 "
        >
          <div className="flex justify-center items-center">
            <Image
              src="/event-icon.svg"
              alt="event-icon"
              width={19}
              height={19}
            />
          </div>
          <div className="text-white  text-sm">Buat Eventmu!</div>
        </Link>
        <div className="flex items-center ml-[-6px] gap-2">
          {/* {session?.user?.id ? ( */}
          {/* <> */}
          {/* <Link
            href={"/create-event"}
            className="flex min-w-max justify-center items-center font-semibold bg-purple-900 px-3 py-2 gap-2 "
          >
            <div className="flex justify-center items-center">
              <Image
                src="/event-icon.svg"
                alt="event-icon"
                width={19}
                height={19}
              />
            </div>
            <div className="text-white  text-sm">Buat Eventmu!</div>
          </Link> */}
          <Link
            href={"/tickets"}
            className="flex min-w-max justify-center items-center font-semibold gap-2 bg-purple-900 px-3 py-2"
          >
            <div className="flex justify-center items-center ">
              <Image
                src="/ticket-icon.svg"
                alt="ticket-icon"
                width={19}
                height={19}
              />
            </div>
            <div className="text-white  text-sm">Tiket Saya</div>
          </Link>
          <button
            onClick={handleClick}
            className="flex items-center justify-between px-2"
          >
            <Image
              src={"/no-profile.svg"}
              alt="avatar"
              width={25}
              height={25}
              className="mr-2 rounded-full aspect-square object-cover"
            />
            {/* <div>{session.user.first_name}</div> */}
            <div>hello</div>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </Menu>
          {/* </> */}
          {/* ) : ( */}
          {/* <div className="flex gap-2 items-center">
            <Link
              href={"/login"}
              className=" border-purple-900 border-x-[0.15rem] border-y-[0.15rem] rounded-[12px] text-[#581c87] px-3 py-2"
            >
              Masuk
            </Link>
            <Link
              href={"/register"}
              className=" border-purple-900 border-x-[0.15rem] border-y-[0.15rem] bg-purple-900 rounded-[12px] text-white px-3 py-2 "
            >
              Daftar
            </Link>
          </div> */}
          {/* )} */}
        </div>
      </div>
      {query ? (
        <div className="relative">
          <SearchBar />
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

function NavbarMobile() {
  const [isClick, setClick] = useState<boolean>(false);
  const toggleNavbar = () => {
    setClick(!isClick);
  };
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        router.push(`/?q=${query}`, { scroll: false });
      }
      // else {
      //   router.push("/", { scroll: false });
      // }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, router]);

  const handleBlur = () => {
    setTimeout(() => {
      setQuery("");
    }, 200);
  };

  return (
    <>
      <div className="flex justify-between md:hidden px-[4px] w-full bg-purple-300 items-center py-[4px]">
        <Link href={"/"} className="pb-2">
          <Image src="/logo.png" width={105} height={105} alt="logo"></Image>
        </Link>
        <div className=" pr-[7px] flex bg-[#f0f0f0] w-[80%] rounded-md mx-8 h-[38px] min-h-max my-auto">
          <div className="flex justify-center items-center w-full h-full  mr-0">
            <div className="flex justify-center items-center w-[38px] h-[38px] bg-purple-900 rounded-l-md">
              <Image
                src="/search-icon.svg"
                alt="search-icon"
                width={16}
                height={16}
              />
            </div>

            <input
              type="text"
              placeholder="Cari event menarikmu disini"
              className=" bg-[#f0f0f0] w-full h-full focus:outline-offset-1 px-4"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-black md:text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-900"
            onClick={toggleNavbar}
          >
            {isClick ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {query ? (
        <div className="relative">
          <SearchBar />
        </div>
      ) : (
        <></>
      )}
      {isClick && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 spa-y-1 sm:px-3 bg-purple-100 text-purple-950">
            {/*SIGN IN */}
            <Link
              href={"/tickets"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2 "
            >
              <Image
                src="/ticket-icon.svg"
                alt="ticket-icon"
                width={19}
                height={19}
                className="bg-purple-500 p-1 rounded-full max-w-[36px]"
              />

              <div className=" text-sm">Tiket Saya</div>
            </Link>
            <Link
              href={"/create-event"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              <Image
                src="/event-icon-b.svg"
                alt="event-icon"
                width={19}
                height={19}
              />

              <div className="text-sm ">Buat Eventmu!</div>
            </Link>
            <div className="my-2 bg-slate-300 h-[0.5px]"></div>
            <Link
              href={"/"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              {" "}
              Informasi Dasar
            </Link>

            <Link
              href={"/"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              {" "}
              Pengaturan
            </Link>
            <div className="my-2 bg-slate-300 h-[0.5px]"></div>

            <button className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 text-red-600 hover:text-red-800 rounded-lg p-2">
              Keluar
            </button>
            {/* NOT YET SIGN IN */}
            {/* <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl font-bold text-purple-950 px-2">
                Masuk ke Akunmu
              </h1>
              <p className="px-2">
                Untuk menggunakan semua fitur di Rumah Events
              </p>
              <div className="flex justify-center gap-2 items-center py-4 w-[80%] mx-auto max-h-screen">
                <Link
                  href={"/login"}
                  className=" border-purple-900 border-x-[0.15rem] border-y-[0.15rem] rounded-[12px] text-[#581c87] px-3 py-2 w-1/2 text-center"
                >
                  Masuk
                </Link>
                <Link
                  href={"/register"}
                  className=" border-purple-900 border-x-[0.15rem] border-y-[0.15rem] bg-purple-900 rounded-[12px] text-white px-3 py-2 w-1/2 text-center"
                >
                  Daftar
                </Link>
              </div>
            </div>
            <hr className="h-[0.5px] bg-gray-300 border-none my-4" />
            <Link
              href={"/create-event"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              <Image
                src="/event-icon-b.svg"
                alt="event-icon"
                width={19}
                height={19}
              />

              <div className="text-sm ">Buat Eventmu!</div>
            </Link>

            <Link
              href={"/about"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              <Image
                src="/event-icon-b.svg"
                alt="about-icon"
                width={19}
                height={19}
              />

              <div className="text-sm ">Tentang Rumah Events</div>
            </Link>
            <Link
              href={"/contact"}
              className="flex min-w-max justify-start items-center font-semibold px-3 py-2 gap-2 hover:text-white hover:bg-purple-900 rounded-lg p-2"
            >
              <Image
                src="/bantuan-icon.svg"
                alt="contact-icon"
                width={19}
                height={19}
                className="bg-purple-400 rounded-full"
              />

              <div className="text-sm ">Hubungi Kami</div>
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
}
