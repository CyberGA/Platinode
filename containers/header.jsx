import Navigation from "@/components/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import { UButton } from "@/components/utils";
import { useGlobalContext } from "@/contexts/global-context";
import shortened from "@/lib/shortened";
import { TbCopy } from "react-icons/tb";
import { SiEthereum } from "react-icons/si";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const { connectWallet, walletConnected, refreshWallet, getUser } =
    useGlobalContext();
  const [addr, setAddr] = useState("");

  async function getAdrr() {
    const { address } = await getUser();
    setAddr((prev) => address);
    return address;
  }

  async function copyAddr() {
    navigator.clipboard.writeText(addr);
  }

  useEffect(() => {
    refreshWallet();
    getAdrr();

    return () => {};
  }, []);

  return (
    <Navigation
      className={`${
        router.pathname == "/signin" || router.pathname == "/signup"
          ? "px-16"
          : "px-12"
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
      {router.pathname !== "/signin" && router.pathname !== "/signup" && (
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
            {walletConnected ? (
              <div
                className="hidden md:flex flex-row gap-x-8 items-center text-primaryText font-medium text-lg shadow-lg"
                onClick={copyAddr}
              >
                {addr == 0 ? (
                  <Loader color="black" />
                ) : (
                  <div className="flex flex-row items-center justify-center gap-x-1 rounded-lg px-4 py-2 cursor-pointer bg-secondary">
                    <SiEthereum size={16} color="#66" />
                    <p>{shortened(addr)}</p>
                    <TbCopy size="16" />
                  </div>
                )}
              </div>
            ) : (
              <UButton
                className="flex items-center bg-secondary px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
                onClick={connectWallet}
              >
                Connect Wallet
              </UButton>
            )}
          </div>
        </>
      )}
    </Navigation>
  );
}

export default Header;
