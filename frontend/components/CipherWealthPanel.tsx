"use client";

import { useState } from "react";
import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useCipherWealth } from "@/hooks/useCipherWealth";
import { errorNotDeployed } from "./ErrorNotDeployed";
import {
  Wallet, Lock, Unlock, RefreshCw, ArrowDownToLine, ArrowUpFromLine,
  Shield, Eye, EyeOff, Sparkles, Activity, Zap,
  CheckCircle, Clock
} from "lucide-react";

export const CipherWealthPanel = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    accounts,
    isConnected,
    connect,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  const [depositAmount, setDepositAmount] = useState<string>("100");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("50");
  const [showBalance, setShowBalance] = useState(false);

  // FHEVM instance
  const {
    instance: fhevmInstance,
    status: fhevmStatus,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  // CipherWealth contract hook
  const cipherWealth = useCipherWealth({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  if (!isConnected) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="card-premium p-10 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-3xl opacity-30 animate-float">💎</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🔐</div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                  <Wallet className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-card rounded-xl flex items-center justify-center border border-border">
                  <span className="text-xl">✨</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold gradient-text mb-3">
              Welcome to Cipher Wealth
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Your gateway to encrypted wealth management 🚀
            </p>
            
            <button 
              className="btn-premium w-full text-lg py-4 flex items-center justify-center gap-3"
              onClick={connect}
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
              <Sparkles className="w-5 h-5" />
            </button>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">FHE Encrypted</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                <Lock className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">100% Private</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                <Zap className="w-5 h-5 text-success mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Instant Ops</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cipherWealth.isDeployed === false) {
    return errorNotDeployed(chainId);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Balance Card */}
      <div className="card-highlight rounded-2xl p-8 relative overflow-hidden hover-lift">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  💰 Your Encrypted Balance
                </h2>
                <p className="text-sm text-muted-foreground">Secured by FHE Technology</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                className="btn-secondary flex items-center gap-2"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showBalance ? "Hide" : "Show"}
              </button>
              <button
                className="btn-secondary flex items-center gap-2"
                disabled={!cipherWealth.canGetBalance}
                onClick={cipherWealth.refreshBalance}
              >
                <RefreshCw className={`w-4 h-4 ${cipherWealth.isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Balance Display */}
          <div className="mb-6">
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-bold gradient-text">
                {cipherWealth.isDecrypted && showBalance 
                  ? cipherWealth.clear?.toString() || "0" 
                  : "••••••"}
              </span>
              <span className="text-2xl text-muted-foreground">tokens</span>
              {cipherWealth.isDecrypted && (
                <span className="ml-auto flex items-center gap-2 text-success bg-success/10 px-3 py-1 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Decrypted
                </span>
              )}
            </div>
            
            <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                Encrypted Handle (on-chain)
              </p>
              <p className="font-mono text-xs break-all text-foreground/70">
                {cipherWealth.balance || "Fetching encrypted balance..."}
              </p>
            </div>
          </div>

          {/* Decrypt Button */}
          <button
            className={`btn-premium w-full flex items-center justify-center gap-3 py-4 ${
              cipherWealth.isDecrypted ? 'bg-success hover:bg-success/90' : ''
            }`}
            disabled={!cipherWealth.canDecrypt}
            onClick={cipherWealth.decryptBalance}
          >
            {cipherWealth.isDecrypting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Decrypting via FHE...</span>
                <span className="text-lg">🔓</span>
              </>
            ) : cipherWealth.isDecrypted ? (
              <>
                <Unlock className="w-5 h-5" />
                <span>Balance Decrypted</span>
                <span className="text-lg">✅</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Decrypt Balance</span>
                <span className="text-lg">🔐</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit Card */}
        <div className="card-premium p-6 hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center border border-success/30">
              <ArrowDownToLine className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                💵 Deposit
              </h3>
              <p className="text-sm text-muted-foreground">Add funds to your vault</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <span>💰</span> Amount to Deposit
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="input-premium w-full pr-20"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  tokens
                </span>
              </div>
            </div>
            
            {/* Quick amounts */}
            <div className="flex gap-2">
              {[50, 100, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  className="flex-1 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium hover:border-success/50 hover:bg-success/5 transition-all"
                  onClick={() => setDepositAmount(amount.toString())}
                >
                  {amount}
                </button>
              ))}
            </div>
            
            <button
              className="btn-premium w-full flex items-center justify-center gap-3 bg-success hover:bg-success/90"
              disabled={!cipherWealth.canOperate || !depositAmount || Number(depositAmount) <= 0}
              onClick={() => cipherWealth.deposit(Number(depositAmount))}
            >
              {cipherWealth.isOperating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                  <span>⏳</span>
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-5 h-5" />
                  <span>Deposit Now</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Withdraw Card */}
        <div className="card-premium p-6 hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/30">
              <ArrowUpFromLine className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                💸 Withdraw
              </h3>
              <p className="text-sm text-muted-foreground">Retrieve your funds</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <span>💎</span> Amount to Withdraw
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="input-premium w-full pr-20"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  tokens
                </span>
              </div>
            </div>
            
            {/* Quick amounts */}
            <div className="flex gap-2">
              {[25, 50, 100, 'Max'].map((amount) => (
                <button
                  key={amount}
                  className="flex-1 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium hover:border-accent/50 hover:bg-accent/5 transition-all"
                  onClick={() => {
                    if (amount === 'Max' && cipherWealth.clear) {
                      setWithdrawAmount(cipherWealth.clear.toString());
                    } else if (typeof amount === 'number') {
                      setWithdrawAmount(amount.toString());
                    }
                  }}
                >
                  {amount}
                </button>
              ))}
            </div>
            
            <button
              className="btn-premium w-full flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(35 93% 48%))' }}
              disabled={!cipherWealth.canOperate || !withdrawAmount || Number(withdrawAmount) <= 0}
              onClick={() => cipherWealth.withdraw(Number(withdrawAmount))}
            >
              {cipherWealth.isOperating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                  <span>⏳</span>
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-5 h-5" />
                  <span>Withdraw Now</span>
                  <span>💫</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {cipherWealth.message && (
        <div className="card-premium p-4 animate-scale-in border-l-4 border-primary">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <p className="text-sm text-foreground font-mono">{cipherWealth.message}</p>
          </div>
        </div>
      )}

      {/* Contract Info */}
      <div className="card-premium p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Contract Information
          <span className="text-lg">📋</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔗</span>
              <p className="text-sm text-muted-foreground">Chain ID</p>
            </div>
            <p className="font-mono font-bold text-xl text-foreground">{chainId}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔐</span>
              <p className="text-sm text-muted-foreground">FHEVM Status</p>
            </div>
            <p className="font-semibold text-xl text-foreground flex items-center gap-2">
              {fhevmStatus === 'ready' ? (
                <>
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-success">Active</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-accent">{fhevmStatus}</span>
                </>
              )}
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📜</span>
              <p className="text-sm text-muted-foreground">Contract Address</p>
            </div>
            <p className="font-mono text-sm break-all text-foreground">{cipherWealth.contractAddress}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👤</span>
              <p className="text-sm text-muted-foreground">Your Address</p>
            </div>
            <p className="font-mono text-sm break-all text-foreground">{accounts?.[0] || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="card-premium p-5 text-center hover-lift">
          <div className="text-3xl mb-3">🔒</div>
          <h4 className="font-semibold text-foreground mb-1">End-to-End Encrypted</h4>
          <p className="text-xs text-muted-foreground">Your balance is never exposed on-chain</p>
        </div>
        <div className="card-premium p-5 text-center hover-lift">
          <div className="text-3xl mb-3">⚡</div>
          <h4 className="font-semibold text-foreground mb-1">Instant Operations</h4>
          <p className="text-xs text-muted-foreground">Fast deposits and withdrawals</p>
        </div>
        <div className="card-premium p-5 text-center hover-lift">
          <div className="text-3xl mb-3">🛡️</div>
          <h4 className="font-semibold text-foreground mb-1">Zama FHE Powered</h4>
          <p className="text-xs text-muted-foreground">Industry-leading encryption</p>
        </div>
      </div>
    </div>
  );
};
