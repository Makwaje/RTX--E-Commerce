import { LoaderPinwheel } from "lucide-react";
function loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <LoaderPinwheel className="animate-spin" size={80} />
    </div>
  );
}

export default loader;
