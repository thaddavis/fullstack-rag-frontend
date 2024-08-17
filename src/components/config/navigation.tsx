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
    name: "1) Agent without R.A.G.",
    href: "/dashboard/no-rag",
    icon: BiX,
  },
  {
    name: "2) Agent with R.A.G.",
    href: "/dashboard/rag",
    icon: BiCheck,
  },
  {
    name: "3) Reason + Act Agent",
    href: "/dashboard/re-act",
    icon: BiBrain,
  },
  {
    name: "4) Recommendations",
    href: "/dashboard/recommendations",
    icon: BiSolidStar,
  },
  {
    name: "5) Anomaly Detection",
    href: "/dashboard/anomaly-detection",
    icon: BiSolidAlarmExclamation,
  },
  {
    name: "6) Multi-Modal Search",
    href: "/dashboard/multi-modal",
    icon: GoFileMedia,
  },
];
