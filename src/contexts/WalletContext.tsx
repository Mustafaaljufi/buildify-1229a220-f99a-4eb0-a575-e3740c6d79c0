
import React, { createContext, useContext, useState } from 'react';

export interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  // Mock wallet connection
  const connectWallet = async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate random wallet address
    const mockAddress = '0x' + Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    // Set random balance between 0.5 and 10 ETH
    const mockBalance = 0.5 + Math.random() * 9.5;
    
    setAddress(mockAddress);
    setBalance(parseFloat(mockBalance.toFixed(4)));
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      address, 
      balance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};