import { UButton } from "@/components/utils";

export default function StartAProject() {
  return (
    <div className="flex justify-center w-full mt-12">
      <UButton
        height="60px"
        className="flex items-center bg-secondary/90 hover:bg-secondary ease-in duration-300
        px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
      >
        START A PROJECT
      </UButton>
    </div>
  );
}
