import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="m-auto">
      <div className="bg-purple-900 text-white flex justify-center items-start gap-40">
        <div className="py-5 flex flex-col justify-center items-start gap-0">
          <div className="pb-3 font-semibold">Tentang Rumah Events</div>
          <Link href={"/"} className="">
            Tentang Kamikkkk
          </Link>
          <Link href={"/"} className=" ">
            Tentang Kami
          </Link>
          <Link href={"/"} className="">
            Tentang Kami
          </Link>
          <Link href={"/"} className=" ">
            Tentang Kami
          </Link>
        </div>
        <div className="py-5 flex flex-col justify-center items-start gap-0">
          <div className="pb-3 font-semibold">Lokasi Event</div>
        </div>
        <div className="py-5 flex flex-col justify-center items-start gap-0">
          <div className="pb-3 font-semibold">Inspirasi Event</div>
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
