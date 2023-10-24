import { Spinner } from "@nextui-org/react";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface PreparingDataProps {
  isProjectLoading: boolean;
  isPluginsLoading: boolean;
  isCompiling: boolean;
}

const renderIcon = (loading: boolean) => {
  if (loading) {
    return <Spinner color="default" size="sm" />;
  }
  return <BsFillPatchCheckFill className="text-success" />;
};

export default function PreparingData({
  isProjectLoading,
  isPluginsLoading,
  isCompiling,
}: PreparingDataProps) {
  return (
    <div className="w-full gap-14">
      <div className="flex flex-row items-center gap-2 text-default-500">
        <div className="items-center">{renderIcon(true)}</div>
        <div className="items-center">Fetching Project</div>
      </div>
      <div className="flex flex-row items-center gap-2 text-default-500">
        <div className="items-center">{renderIcon(isPluginsLoading)}</div>
        <div className="items-center">Fetching Plugins</div>
      </div>
      <div className="flex flex-row items-center gap-2 text-default-500">
        <div className="items-center">{renderIcon(isCompiling)}</div>
        <div className="items-center">Compiling Plugins</div>
      </div>
    </div>
  );
}
