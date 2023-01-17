import CardNormal from "@/components/card";
import { Image } from "@mantine/core";
import { UButton } from "@/components/utils";
import ProjectCard from "@/components/card/project";
import Link from "next/link"
import StartProjet from "@/components/start-project"


export default function HomeContanier() {
    return (
      <div className="flex flex-col">
        <div className="bg-white px-[15vw]">
          <div className="w-full text-center text-[64px] font-bold text-secondary my-[120px]">
              <div>
                <h1 className="text-primaryText font-light">Global Access To Project Funding</h1>
                <h1 className="text-primaryText ">Just Got Faster and Easier</h1>
                <StartProjet />
              </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-x-6 border bg-secondaryLight rounded-lg mb-[160px] clip shadow-md shadow-black/10">
            <div className='flex flex-col gap-y-6 p-8 w-full'>
              <h2 className="text-primaryText text-[28px] font-bold max-w-sm">CONVERT REAL WORLD ASSETS TO TOKENS</h2>
              <p className='max-w-lg text-[18px] text-primaryText'>Tokenization allows you to unlock the power of liquidity of real life assets enabling flexibility of  capital and cost of management.</p>
            </div>
            <div className="w-full">
                {/* <Image src="/assets/assets.png" width={1063} height={672} alt="assets" /> */}
                <Image src="/assets/assets.png" height={459} alt="Assets" />
            </div>
          </div>
        </div>

        <div className='my-10 py-20 px-6'>
          <h1 className="text-primaryText text-[48px] text-center font-bold">Platinum Investment Analyzed</h1>
          <p className='text-[18px] text-primaryText text-center'>There’s nothing to it, anyone can do it.</p>
        </div>

        <div className='w-full px-[9.5vw] mb-[100px]'>
          <div className="inline-grid grid-cols-3 gap-12 rounded-lg">
            <CardNormal src="/assets/opportuninty.png" alt="your opportunity" title="Opportunity" 
            desc="At Platinum Investment we prepare your assets for the blockchain economy. Get ready to convert your real life assets for the blockchain ecosystem" />
            <CardNormal src="/assets/token.jpg" alt="Tokenization" title="Tokenization" 
            desc="Tokenizing an asset converts its value into digital tokens or securities where ownership of the tokens are recorded on the blockchain. This gives asset owners the flexibility of capital and  various options with their asset." />
            <CardNormal src="/assets/capital.png" alt="Capital flexibility" title="Capital flexibility" 
            desc="Tokenization brings value to your asset by creating an increase in the liquidity, speed through automation, reductions in costs, reduced disputes, and a decentralization of data." />
          </div>
        </div>

        <div className="bg-white my-10 py-20 px-[8vw]">
          <h1 className="text-primaryText text-[48px] text-center font-bold">Latest Ongoing Projects</h1>
          <div className="inline-grid grid-cols-3 gap-12 rounded-lg mt-10">
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={100} alt="wheat farm" />
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={200} alt="wheat farm" isLive={false} />
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={23} alt="wheat farm" />
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={30} alt="wheat farm" />
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={40} alt="wheat farm" />
            <ProjectCard src="/assets/wheat farm.jpg" title="Wheat production" 
            desc="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
            amountRequested={200} amountReceived={25} alt="wheat farm" />
          </div>
          <div className="flex flex-row justify-end w-full mt-8">
            <Link href="/explore" legacyBehavior>
              <a className='text-[20px] text-primaryText text-right underline hover:text-secondary ease-in duration-300'>{"See more >>"}</a>
            </Link>
          </div>

          <div className="w-full text-center text-[64px] font-bold text-secondary my-[120px]">
              <div>
                <h1 className="text-primaryText ">Need Support Or Funding?</h1>
                <StartProjet />
              </div>
          </div>
        </div>

        
        
      </div>
    )
  }