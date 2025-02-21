import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="m-auto">
      <div className="bg-purple-900 text-white  ">
        <div className="w-[90%] m-auto grid grid-cols-2 gap-2 items-start justify-center  md:grid-cols-4 md:gap-0">
          <div className="py-5 flex flex-col justify-center items-start gap-0 ">
            <div className="pb-3 font-semibold">Tentang Rumah Events</div>
            <Link href={"/"} className="">
              Masuk
            </Link>
            <Link href={"/"} className=" ">
              Baiya
            </Link>
            <Link href={"/"} className="">
              FAQ
            </Link>
            <Link href={"/"} className=" ">
              Syarat dan Ketentuan
            </Link>
          </div>
          <div className="py-5 flex flex-col justify-center items-start gap-0">
            <div className="pb-3 font-semibold">Lokasi Event</div>
            <Link href={"/"} className="">
              Jakarta
            </Link>
            <Link href={"/"} className=" ">
              Bandung
            </Link>
            <Link href={"/"} className="">
              Surabaya
            </Link>
            <Link href={"/"} className=" ">
              Medan
            </Link>
            <Link href={"/"} className=" ">
              Yogyakarta
            </Link>
          </div>
          <div className="py-5 flex flex-col justify-center items-start gap-0">
            <div className="pb-3 font-semibold">Inspirasi Event</div>
            <Link href={"/"} className=" ">
              Art
            </Link>
            <Link href={"/"} className=" ">
              Music and Theater
            </Link>
            <Link href={"/"} className=" ">
              Education
            </Link>
            <Link href={"/"} className=" ">
              Sport and Fitness
            </Link>
            <Link href={"/"} className=" ">
              Business
            </Link>
          </div>
          <div className="py-5 flex flex-col justify-center items-start gap-0">
            <div className="pb-3 font-semibold">Inspirasi Event</div>
            <Link href={"/"} className=" ">
              Art
            </Link>
            <Link href={"/"} className=" ">
              Music and Theater
            </Link>
            <Link href={"/"} className=" ">
              Education
            </Link>
            <Link href={"/"} className=" ">
              Sport and Fitness
            </Link>
            <Link href={"/"} className=" ">
              Business
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-purple-400 text-gray-700 flex flex-col">
        <div className="mt-10 flex justify-center items-start gap-5 text-[5px]">
          <Link href={"/"} className="text-[12px] ">
            Tentang Kami
          </Link>
          <Link href={"/"} className="text-[12px] ">
            Hubungi Kami
          </Link>
          <Link href={"/"} className="text-[12px] ">
            Kebijakan Pribadi
          </Link>
          <Link href={"/"} className="text-[12px] ">
            Kebijakan cookie
          </Link>
        </div>
        <div className="m-auto text-[12px] my-10">copyright Rumah Events</div>
      </div>
    </div>
  );
}

export default Footer;
