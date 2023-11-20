"use client";

import { useState } from "react";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { set } from "mongoose";

const Card = ({ lore, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(lore.content);
    navigator.clipboard.writeText(lore.content);
    setTimeout(() => {
      setCopied(""), 3000;
    });
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={lore?.creator?.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {lore?.creator?.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {lore?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              copied === lore.content
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy icon"
            width={12}
            height={12}
            className="cursor-pointer"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-m text-gray-700 font-bold">
        {lore.title}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700">{lore.content}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(lore.tag)}
      >
        #{lore.tag}
      </p>

      {session?.user?.id === lore?.creator?.id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
