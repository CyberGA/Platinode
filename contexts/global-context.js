import {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  useReducer,
} from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { initState, StoreReducer, StoreAction } from "@/hooks/store";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(StoreReducer, initState);
  const [walletConnected, setWalletConnected] = useLocalStorage({
    key: "connectShime",
    defaultValue: false,
  });

  const web3ModalRef = useRef();

  const router = useRouter();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    setLoading((prev) => true);

    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      const balance = await signer
        .getBalance()
        .then((bal) => ethers.utils.formatEther(bal));
      // dispatch({
      //   type: StoreAction.SAVE_ACCOUT,
      //   payload: {
      //     address,
      //     balance,
      //   },
      // });
      setWalletConnected((prev) => true);
      setLoading((prev) => false);
    } catch (err) {
      console.error(err.message);
      setLoading((prev) => false);
    }
  };

  function refreshWallet() {
    setLoading((prev) => true);
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
    setLoading((prev) => false);
  }

  const getUser = async () => {
    const signer = await getProviderOrSigner(true);
    const balance = await signer
      .getBalance()
      .then((bal) => ethers.utils.formatEther(bal));
    const address = await signer.getAddress();

    return { balance, address };
  };

  useEffect(() => {
    let isMounted = true;
    setLoading((prev) => true);
    refreshWallet();

    return () => {
      isMounted = false;
      setLoading((prev) => false);
    };
  }, [walletConnected, router.pathname]);

  const globalValues = useMemo(() => {
    return {
      loading,
      setLoading,
      getProviderOrSigner,
      state,
      refreshWallet,
      dispatch,
      getUser,
      connectWallet,
      walletConnected,
      setWalletConnected,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, walletConnected]);

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
