import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ContractAddr } from "@/constants";
import { ethers } from "ethers"

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const { contract } = useContract(ContractAddr);
  const [loading, setLoading] = useState(false);
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

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      address,
      contract,
      connect,
      createProject: publishProject,
      getProjects,
      getUserProjects,
      getDonations,
      donate,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, address]);

  useEffect(() => {
    connect();
  }, []);
  

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
