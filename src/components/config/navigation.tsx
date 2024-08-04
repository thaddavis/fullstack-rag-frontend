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
    href: "/agents/no-rag",
    icon: BiX,
  },
  {
    name: "Agent with R.A.G.",
    href: "/agents/rag",
    icon: BiCheck,
  },
  {
    name: "ReAct Agent",
    href: "/agents/react",
    icon: BiBrain,
  },
  {
    name: "Recommendations",
    href: "/recommendations",
    icon: BiSolidStar,
  },
  {
    name: "Anomaly Detection",
    href: "/anomaly-detection",
    icon: BiSolidAlarmExclamation,
  },
];
