import ProjectCard from "@/components/card/project";
import { UInput, UButton } from "@/components/utils";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "@mantine/core";

export default function ExploreContainer() {
  return (
    <div className=" py-20 px-[8vw]">
      <div className="flex justify-center fixed top-[120px] right-0 left-0 z-[99] backdrop-filter backdrop-blur-xl p-4">
        <div className="flex flex-row items-center pr-[16px] gap-x-[16px] border border-[#485E5F] rounded-[5px] h-[60px] w-full max-w-[616px] bg-white clip">
          <UInput type="text" placeholder="Search for a project" />
          <UButton type="submit" className="bg-secondary rounded-[5px] px-4" onClick={() => console.log("Searching")}>
            <BsArrowRight color="303c3d" size="24px" />
          </UButton>
        </div>
      </div>
      <div className="inline-grid grid-cols-3 gap-12 rounded-lg mt-10">
        <ProjectCard link={`/explore/Wheat production`} src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={100} alt="wheat farm" />
        <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={200} alt="wheat farm" isLive={false} />
        <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={23} alt="wheat farm" />
        <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={30} alt="wheat farm" />
        <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={40} alt="wheat farm" />
        <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway" amountRequested={200} amountReceived={25} alt="wheat farm" />
      </div>

      <div className="flex justify-center w-full mt-8 py-10">
        <Pagination total={10} color="cyan.3" variant="light" size="lg" />
      </div>
    </div>
  );
}
