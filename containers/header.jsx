import Navigation from "@/components/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import { UButton } from "@/components/utils";



function Header() {
  const router = useRouter();

  return (
    <Navigation
      className={`${
        (router.pathname == "/signin" || router.pathname == "/signup") ? "px-16" : "px-12"
      } h-[120px] backdrop-filter backdrop-blur-xl border-b`}
    >
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/logo-dark.png"
          alt="Brand logo"
          width={120}
          height={60}
        />
      </div>
      {(router.pathname !== "/signin" && router.pathname !== "/signup") && (
        <>
          <div className="flex flex-row gap-x-[30px]">
            <Navigation.Link href="/" active={router.pathname == "/"}>
              Overview
            </Navigation.Link>
            <Navigation.Link
              href="/explore"
              active={router.pathname == "/explore"}
            >
              Explore
            </Navigation.Link>
            <Navigation.Link
              href="/how-it-works"
              active={router.pathname == "/how-it-works"}
            >
              How it works
            </Navigation.Link>
          </div>
          <div className="flex flex-row gap-x-[30px] items-center">
            <UButton
              className="flex items-center bg-secondary px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
            >
              Connect Wallet
            </UButton>
          </div>
        </>
      )}
      
    </Navigation>
  );
}

export default Header;
