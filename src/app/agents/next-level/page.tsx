import { BiCalendar } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrMultimedia } from "react-icons/gr";

export default function Page() {
  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-sm max-w-lg border bg-background">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          More advanced agent types include...
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-center">
            <div className="bg-blue-600 text-white rounded-full p-2 mr-4">
              <BiCalendar className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold">Plan & Execute Agents</span>
          </li>
          <li className="flex items-center justify-center">
            <div className="bg-blue-600 text-white rounded-full p-2 mr-4">
              <FaPeopleGroup className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold">Agent Swarms</span>
          </li>
          <li className="flex items-center justify-center">
            <div className="bg-blue-600 text-white rounded-full p-2 mr-4">
              <GrMultimedia className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold">Multi-modal Agents</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
