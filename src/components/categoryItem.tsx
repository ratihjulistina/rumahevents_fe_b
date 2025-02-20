"use client";
// import { GlobalStateContext } from "@/context/GlobalStateContext";
import Link from "next/link";
import CategoryEvent from "./category.events";
// import { useContext } from "react";

const Categoryitem = ({ title }: { title: string }) => {
  //   const context = useContext(GlobalStateContext);

  return (
    <Link
      href={"/#category"}

      //   onClick={context?.exitMenu}
    >
      {title} {/* <CategoryEvent filterkey={title} /> */}
    </Link>
  );
};

export default Categoryitem;
