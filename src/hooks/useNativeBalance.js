import { getNativeByChain } from "helpers/networks";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useMemo, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export const useNativeBalance = (options) => {
  const { account } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const [balance, setBalance] = useState({ inWei: 0, formatted: 0 });

  const nativeName = useMemo(() => getNativeByChain(options?.chain || chainId), [options, chainId]);

  const {
    fetch: getBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getTokenBalances, {
    chain: chainId,
    address: walletAddress,
    ...options,
  });

  useEffect(() => {
    if (data && data[0]?.hasOwnProperty('balance')) {
      const balances = {
        inWei: data[0].balance,
        // missing second argument (decimals) in FromWei function,
        formatted: Moralis.Units.FromWei(data[0].balance, data[0].decimals),
      };
      setBalance(balances);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { getBalance, balance, nativeName, error, isLoading };
};