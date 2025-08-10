
export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  priceChange24h: number;
  balance?: number;
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  reserve0: number;
  reserve1: number;
  totalLiquidity: number;
  apr: number;
  userLiquidity?: number;
}

export interface Transaction {
  id: string;
  type: 'swap' | 'addLiquidity' | 'removeLiquidity';
  timestamp: number;
  fromToken?: Token;
  toToken?: Token;
  fromAmount?: number;
  toAmount?: number;
  pool?: Pool;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
}

export interface PriceDataPoint {
  timestamp: number;
  price: number;
}

// Mock tokens
export const tokens: Token[] = [
  {
    id: '1',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '/placeholder.svg',
    price: 3245.67,
    priceChange24h: 2.34,
    balance: 1.245
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: '/placeholder.svg',
    price: 52345.12,
    priceChange24h: -1.2,
    balance: 0.023
  },
  {
    id: '3',
    symbol: 'USDT',
    name: 'Tether',
    logo: '/placeholder.svg',
    price: 1.0,
    priceChange24h: 0.01,
    balance: 1250.45
  },
  {
    id: '4',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '/placeholder.svg',
    price: 1.0,
    priceChange24h: 0.0,
    balance: 2500.0
  },
  {
    id: '5',
    symbol: 'DAI',
    name: 'Dai',
    logo: '/placeholder.svg',
    price: 1.0,
    priceChange24h: -0.01,
    balance: 750.25
  },
  {
    id: '6',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: '/placeholder.svg',
    price: 15.78,
    priceChange24h: 5.67,
    balance: 45.0
  }
];

// Mock pools
export const pools: Pool[] = [
  {
    id: '1',
    token0: tokens[0], // ETH
    token1: tokens[2], // USDT
    reserve0: 1500,
    reserve1: 4875000,
    totalLiquidity: 4875000,
    apr: 12.5,
    userLiquidity: 1000
  },
  {
    id: '2',
    token0: tokens[0], // ETH
    token1: tokens[3], // USDC
    reserve0: 2000,
    reserve1: 6500000,
    totalLiquidity: 6500000,
    apr: 10.2,
    userLiquidity: 500
  },
  {
    id: '3',
    token0: tokens[1], // BTC
    token1: tokens[2], // USDT
    reserve0: 100,
    reserve1: 5234512,
    totalLiquidity: 5234512,
    apr: 8.7,
    userLiquidity: 0
  },
  {
    id: '4',
    token0: tokens[5], // LINK
    token1: tokens[0], // ETH
    reserve0: 10000,
    reserve1: 50,
    totalLiquidity: 162283.5,
    apr: 15.3,
    userLiquidity: 200
  }
];

// Mock transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'swap',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    fromToken: tokens[0], // ETH
    toToken: tokens[2], // USDT
    fromAmount: 0.5,
    toAmount: 1622.84,
    status: 'completed',
    hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  },
  {
    id: '2',
    type: 'addLiquidity',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    pool: pools[0],
    fromToken: tokens[0], // ETH
    toToken: tokens[2], // USDT
    fromAmount: 1,
    toAmount: 3245.67,
    status: 'completed',
    hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  },
  {
    id: '3',
    type: 'swap',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    fromToken: tokens[2], // USDT
    toToken: tokens[5], // LINK
    fromAmount: 500,
    toAmount: 31.68,
    status: 'completed',
    hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  },
  {
    id: '4',
    type: 'removeLiquidity',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    pool: pools[1],
    fromToken: tokens[0], // ETH
    toToken: tokens[3], // USDC
    fromAmount: 0.25,
    toAmount: 812.5,
    status: 'completed',
    hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  },
  {
    id: '5',
    type: 'swap',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    fromToken: tokens[1], // BTC
    toToken: tokens[0], // ETH
    fromAmount: 0.01,
    toAmount: 0.16,
    status: 'failed',
    hash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  }
];

// Generate mock price chart data
export const generatePriceData = (days: number, volatility: number = 0.05, startPrice: number = 3245.67): PriceDataPoint[] => {
  const data: PriceDataPoint[] = [];
  const now = Date.now();
  const pointsPerDay = 24; // One point per hour
  const totalPoints = days * pointsPerDay;
  let currentPrice = startPrice;
  
  for (let i = 0; i < totalPoints; i++) {
    // Random price movement with specified volatility
    const change = currentPrice * (Math.random() * volatility * 2 - volatility);
    currentPrice += change;
    
    // Ensure price doesn't go below 0
    if (currentPrice < 0) currentPrice = startPrice * 0.1;
    
    const timestamp = now - (totalPoints - i) * (24 * 60 * 60 * 1000 / pointsPerDay);
    
    data.push({
      timestamp,
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return data;
};

// Mock function to get price data for a token pair
export const getPriceData = (token0Id: string, token1Id: string, days: number = 7): PriceDataPoint[] => {
  const token0 = tokens.find(t => t.id === token0Id);
  const token1 = tokens.find(t => t.id === token1Id);
  
  if (!token0 || !token1) return [];
  
  // For stablecoins, use lower volatility
  const isStablecoin = (token: Token) => ['USDT', 'USDC', 'DAI'].includes(token.symbol);
  const volatility = isStablecoin(token0) && isStablecoin(token1) ? 0.001 : 0.05;
  
  // Calculate relative price (token0 in terms of token1)
  const startPrice = token0.price / token1.price;
  
  return generatePriceData(days, volatility, startPrice);
};

// Mock function to calculate swap amount
export const calculateSwapAmount = (fromToken: Token, toToken: Token, amount: number): number => {
  if (!fromToken || !toToken || amount <= 0) return 0;
  
  // Simple price-based calculation with a 0.3% fee
  const fee = 0.003;
  const amountWithFee = amount * (1 - fee);
  return (amountWithFee * fromToken.price) / toToken.price;
};