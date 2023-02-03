import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ContractAddr } from "@/constants";
import { ethers } from "ethers";
import ErrorSnackbar from "@/components/error-snackbar";
import { useRouter } from "next/router";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const { contract } = useContract(ContractAddr);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const router = useRouter();
  const { mutateAsync: createProject } = useContractWrite(
    contract,
    "createProject"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishProject = async (form) => {
    try {
      const data = await createProject([
        address,
        form.title,
        form.desc,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getProjects = async () => {
    const projects = await contract.call("getProjects");

    const parsedProjects = projects.map((project, i) => ({
      owner: project.owner,
      title: project.title,
      desc: project.desc,
      target: ethers.utils.formatEther(project.target.toString()),
      deadline: project.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        project.amountCollected.toString()
      ),
      image: project.image,
      pId: i,
    }));

    return parsedProjects.reverse();
  };

  const getUserProjects = async () => {
    const allProjects = await getProjects();

    const filteredProjects = allProjects.filter(
      (project) => project.owner === address
    );

    return filteredProjects;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToProject", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const connectWallet = async () => {
    if (window.ethereum === undefined) {
      console.error("No ethereum object found");

      setAlertMsg(
        (prev) =>
          "No Ethereum provider found! Please install a wallet extension like MetaMask or use brave browser and setup a wallet"
      );
      setShowAlert((prev) => true);
      router.pathname !== "/" && router.push("/");
      return null;
    }
    setLoading((prev) => true);

    try {
      const connectData = await connect();

      if (connectData.data) {
        setWalletConnected((prev) => true);
      }

      const chainID = await connectData.data?.chain.id;

      if (chainID !== 5) {
        setAlertMsg((prev) => "Please change to Goerli network and refresh");
        setShowAlert((prev) => true);
      }

      setLoading((prev) => false);
    } catch (err) {
      console.error(err.message);
      setAlertMsg((prev) => `Error: ${err.message}`);
      setShowAlert((prev) => true);
      setLoading((prev) => false);
    }
  };

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      address,
      contract,
      createProject: publishProject,
      getProjects,
      getUserProjects,
      getDonations,
      donate,
      connectWallet,
      showAlert,
      setShowAlert,
      alertMsg,
      setAlertMsg,
      walletConnected,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, address, showAlert, alertMsg, contract]);

  useEffect(() => {
    connectWallet();
  }, [router.pathname, walletConnected]);

  return (
    <GlobalContext.Provider value={globalValues}>
      <ErrorSnackbar />
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
