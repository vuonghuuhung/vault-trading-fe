import { useState } from "react";
import { MODAL_STEP } from "../components/ModalStep";
import { getHistoricalData, getListVaultFromContract } from "services/walletService";
import { ChainType } from "store/authentication/useAuthenticationStore";
import { VaultDetailDTO } from "components/pages/home/constants";
import { HistoricalData } from "../constants";
import { useVaultActions } from "store/vault/selector";

export const useFetchHistoryData = () => {
    const [content, setContent] = useState('');
    const [step, setStep] = useState(MODAL_STEP.READY);
    const { handleSetHistoricalData } = useVaultActions();

    const handleStatus = (content: string, status: MODAL_STEP) => {
        setStep(status);
        setContent(content);
    };

    const handleRetrieve = async (vaultAdd: string, currentChain: ChainType): Promise<{ historicalData: HistoricalData }> => {
        handleStatus('Retrieving historical data of vault...', MODAL_STEP.PROCESSING);
        const { historicalData } = await getHistoricalData(vaultAdd, currentChain);
        handleSetHistoricalData({ historicalVaultData: historicalData });
        handleStatus('Retrieving historical data of vault...', MODAL_STEP.READY);
        return { historicalData: historicalData };
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
