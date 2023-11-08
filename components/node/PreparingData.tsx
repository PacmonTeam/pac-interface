import { Spinner } from "@nextui-org/react";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface PreparingDataProps {
  isProjectLoading: boolean;
  isPluginsLoading: boolean;
  isCompiling: boolean;
}

const renderIcon = (loading: boolean) => {
  if (loading) {
    return <Spinner color="warning" size="sm" />;
  }
  return <BsFillPatchCheckFill className="text-success" />;
};

export default function PreparingData({
  isProjectLoading,
  isPluginsLoading,
  isCompiling,
}: PreparingDataProps) {
  return (
    <div className="w-full h-auto m-auto flex justify-center items-center my-32">
      <div className="flex gap-2 flex-col w-52">
        <div className="flex flex-row items-center gap-2 text-default-500">
          <div className="items-center justify-center w-5">
            {renderIcon(isPluginsLoading)}
          </div>
          <div className="items-center">
            Fetching <span className="font-bold">Plugins</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 text-default-500">
          <div className="items-center justify-center w-5">
            {renderIcon(isProjectLoading)}
          </div>
          <div className="items-center">
            Fetching <span className="font-bold">Project</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 text-default-500">
          <div className="items-center justify-center w-5">
            {renderIcon(isCompiling)}
          </div>
          <div className="items-center">
            Compiling <span className="font-bold">Plugins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
