import { useRouter } from "next/router"
import Image from 'next/image';

export default function ProjectDetails() {
    const router = useRouter()

    return (
        <div className="flex flex-row bg-white w-full px-[5vw] py-[8vh] text-primaryText">
            <div>
                <h1 className="text-[32px] font-bold ">Speedo Mick&#39;s final stomp</h1>
                <div className="pt-4">
                    <Image width={730} height={414} src="/assets/wheat farm.jpg" alt="wheat farm" className="rounded-lg" />
                </div>
                <div className="mt-3">
                    <p className="text-[18px]">Michael Cullen is organising this fundraiser on behalf of The Speedomick Foundation.</p>
                </div>
            </div>
        </div>
    )
}