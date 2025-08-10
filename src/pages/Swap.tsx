
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { tokens, calculateSwapAmount, getPriceData, PriceDataPoint, Token } from "@/services/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useTheme } from "@/contexts/ThemeContext";

const Swap = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[2]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<"1d" | "7d" | "30d" | "90d">("7d");
  
  useEffect(() => {
    if (fromToken && toToken) {
      const days = timeRange === "1d" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
      const data = getPriceData(fromToken.id, toToken.id, days);
      setPriceData(data);
    }
  }, [fromToken, toToken, timeRange]);
  
  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const amount = parseFloat(fromAmount);
      if (!isNaN(amount) && amount > 0) {
        const calculatedAmount = calculateSwapAmount(fromToken, toToken, amount);
        setToAmount(calculatedAmount.toFixed(6));
      } else {
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromToken, toToken, fromAmount]);
  
  const handleFromTokenChange = (value: string) => {
    const token = tokens.find(t => t.id === value);
    if (token) {
      // Don't allow same token for both sides
      if (token.id === toToken.id) {
        const otherToken = tokens.find(t => t.id !== token.id);
        if (otherToken) setToToken(other