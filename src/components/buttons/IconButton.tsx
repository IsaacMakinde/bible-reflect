import { ReactNode, FC } from "react";
import { GoogleIcon } from "../icons/GoogleIcon";
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  GraduationCap,
  ImagePlus,
} from "lucide-react";

export type IconType =
  | "journal"
  | "dashboard"
  | "settings"
  | "study"
  | "google"
  | "imagePlus";

type IconButtonProps = {
  type: IconType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  label?: string;
};

const iconButtons: Record<IconType, { label: string; svg: ReactNode }> = {
  journal: {
    label: "Journal",
    svg: <BookOpen className="h-6 w-6" />,
  },
  dashboard: {
    label: "Dashboard",
    svg: <LayoutDashboard className="h-6 w-6" />,
  },
  settings: {
    label: "Settings",
    svg: <Settings className="h-6 w-6" />,
  },
  study: {
    label: "Study",
    svg: <GraduationCap className="h-6 w-6" />,
  },
  google: {
    label: "Sign in with Google",
    svg: <GoogleIcon />,
  },
  imagePlus: {
    label: "Add image",
    svg: <ImagePlus className="h-6 w-6"></ImagePlus>,
  },
};

const IconButton: FC<IconButtonProps> = ({
  type,
  onClick,
  className = "",
  disabled,
  label,
}) => {
  const { svg, label: defaultLabel } = iconButtons[type];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center py-2 px-4 rounded shadow-md hover:bg-gray-100 w-full font-bold ${className}`}
    >
      {svg}
      <span className="ml-2">{label || defaultLabel}</span>
    </button>
  );
};

export default IconButton;
