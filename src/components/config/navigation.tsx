import {
  BiBrain,
  BiCheck,
  BiSolidAlarmExclamation,
  BiSolidStar,
  BiX,
} from "react-icons/bi";

export const navigation = [
  {
    name: "Agent without R.A.G.",
    href: "/dashboard/no-rag",
    icon: BiX,
  },
  {
    name: "Agent with R.A.G.",
    href: "/dashboard/rag",
    icon: BiCheck,
  },
  {
    name: "ReAct Agent",
    href: "/dashboard/re-act",
    icon: BiBrain,
  },
  {
    name: "Recommendations",
    href: "/dashboard/recommendations",
    icon: BiSolidStar,
  },
  {
    name: "Anomaly Detection",
    href: "/dashboard/anomaly-detection",
    icon: BiSolidAlarmExclamation,
  },
];
