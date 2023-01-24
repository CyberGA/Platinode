import { UButton } from "@/components/utils";
import { useRouter } from "next/router";


export default function StartAProject({sx}) {
  const router = useRouter();
  return (
    <div className={`flex justify-center w-full mt-12 ${sx}`}>
      <UButton
        height="60px"
        className="flex items-center bg-secondary/90 hover:bg-secondary ease-in duration-300
        px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
        onClick={() => router.push("/project/create")}
      >
        START A PROJECT
      </UButton>
    </div>
  );
}
