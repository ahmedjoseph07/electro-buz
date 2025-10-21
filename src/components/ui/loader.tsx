import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
    </div>
  );
};

export default Loader;
