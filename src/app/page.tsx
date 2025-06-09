"use client";
import { FormEvent, useState } from "react";
import { makeCall } from "./server/actions";

export default function Home() {
  const [phone, setPhone] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phone.length > 8) {
      const res = await makeCall(phone);
      if (res.success) {
        var t1 = document.getElementById("form")
        var t2 = document.getElementById("initiated")
        t1?.classList.replace("flex", "hidden")
        t2?.classList.replace("hidden", "flex")
      }
    } else {
      alert("invalid number");
    }
  };
  return (
    <div className="grid grid-rows-3 items-center bg-gradient-to-br from-slate-100 to-blue-100 h-[100vh]">
      <div className="items-center flex flex-col text-slate-900">
        <img
          className="size-14 rounded-lg shadow-xl"
          src="https://acdn.inaiways.com/filters:format(webp)/filters:quality(100)/filters:proportion(1)/www.inaiways.com/inaiways-logoo.png"
          alt="Inaiways_logo"
        />
        <hr className="border-slate-900 mt-4 w-2xs" />
        <h1 className="poppins-bold text-3xl mt-4 mb-2">Inaiways Technology</h1>
        <p className="poppins-normal text-sm">
          Experience the future of AI conversation
        </p>
      </div>
      <div className="items-center flex mx-auto">
        <form
          id="form"
          className="flex items-center shadow-xl border border-slate-100 bg-white px-8 py-4 rounded-xl space-x-3"
          onSubmit={handleSubmit}
        >
          <input
            className="poppins-normal px-3 py-2 border border-slate-200 rounded-lg w-sm text-slate-400"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your number, e.g. 9190XXXXXXXX"
          />
          <input
            className="poppins-semibold bg-blue-600 px-6 py-2 text-sm text-white rounded-lg hover:scale-105 duration-300 hover:bg-blue-400 "
            type="submit"
            value="Get a call"
          />
        </form>
        <div
          id="initiated"
          className="flex-col items-center shadow-xl border border-slate-100 bg-white px-8 hidden py-4 rounded-xl space-x-3"
        >
          <h1 className="poppins-semibold text-slate-900 text-3xl">
            Call initiated successfully!
          </h1>
          <p className="text-slate-500 text-xs">
            You will recieve a call shortly
          </p>
        </div>
      </div>
      <div className=" mt-auto mx-auto p-8 text-slate-500">
        <h2 className="poppins-normal text-sm">
          © 2025 Inaiways Technology. All rights reserved
        </h2>
      </div>
    </div>
  );
}
