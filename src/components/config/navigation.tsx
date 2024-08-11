import {
  BiBrain,
  BiCheck,
  BiSolidAlarmExclamation,
  BiSolidStar,
  BiX,
} from "react-icons/bi";
import { GoFileMedia } from "react-icons/go";

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
    name: "Reason + Act Agent",
    href: "/dashboard/re-act",
    icon: BiBrain,
  },
  {
    name: "Workout Recommendations",
    href: "/dashboard/recommendations",
    icon: BiSolidStar,
  },
  {
    name: "Anomaly Detection",
    href: "/dashboard/anomaly-detection",
    icon: BiSolidAlarmExclamation,
  },
  {
    name: "Multi-Modal R.A.G.",
    href: "/dashboard/multi-modal",
    icon: GoFileMedia,
  },
];
