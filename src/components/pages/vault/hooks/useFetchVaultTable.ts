import { useState } from "react";
import { MODAL_STEP } from "../components/ModalStep";
import { getListVaultFromContract } from "services/walletService";
import { ChainType } from "store/authentication/useAuthenticationStore";
import { VaultDetailDTO } from "components/pages/home/constants";

export const useFetchVaultTable = () => {
    const [content, setContent] = useState('');
    const [step, setStep] = useState(MODAL_STEP.READY);

    const handleStatus = (content: string, status: MODAL_STEP) => {
        setStep(status);
        setContent(content);
    };

    const handleRetrieve = async (currentChain: ChainType, address: string, vaultId: string | undefined, vaultDetail: VaultDetailDTO | null): Promise<{ listVault: VaultDetailDTO[], detailVault: VaultDetailDTO | null }> => {
        handleStatus('Retrieving data onchain...', MODAL_STEP.PROCESSING);
        const { data, network } = await getListVaultFromContract(currentChain, address);
        if (data.length == 0) {
            handleStatus('No vault found in this network!', MODAL_STEP.FAILED);
            return {
                listVault: [],
                detailVault: null
            }
        }

        const vaultAddr = vaultId || vaultDetail?.address || '';
        const newVaultDetail = data.find((e) => e.address.toLowerCase().trim() === vaultAddr.toLowerCase().trim()) || null;
        handleStatus('Retrieving data onchain...', MODAL_STEP.READY);
        return {
            listVault: data,
            detailVault: newVaultDetail
        }
    }

    const resetModalStep = () => {
        setStep(MODAL_STEP.READY);
    };

    return {
        content,
        step,
        handleRetrieve,
        resetModalStep
    };
};
