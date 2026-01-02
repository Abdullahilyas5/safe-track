'use client';
import { useState } from "react";

type Props = {}

const Sidebar = (props: Props) => {
    const [SearchTerm , setSearchTerm] = useState<string[]>([]);
  return (
    <div className="h-full w-full bg-red-500 p-4 border border-gray-300">
        <input type="text" className="border border-gray-300 rounded-md p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>

    </div>
  )
};

export default Sidebar;