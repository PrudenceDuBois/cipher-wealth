"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, ChevronDown } from "lucide-react";

export function ConnectWalletTopRight() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="btn-premium flex items-center gap-2 px-5 py-2.5"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect</span>
                    <span className="text-sm">✨</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal}
                    className="px-4 py-2.5 rounded-xl bg-danger text-danger-foreground font-semibold flex items-center gap-2 hover:bg-danger/90 transition-all"
                  >
                    <span>⚠️</span>
                    Wrong Network
                    <ChevronDown className="w-4 h-4" />
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Chain Button */}
                  <button
                    onClick={openChainModal}
                    className="glass px-3 py-2 rounded-xl flex items-center gap-2 hover:border-primary/50 transition-all"
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-5 h-5 rounded-full overflow-hidden"
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium hidden sm:inline">{chain.name}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>

                  {/* Account Button */}
                  <button
                    onClick={openAccountModal}
                    className="glass px-4 py-2 rounded-xl flex items-center gap-2 hover:border-primary/50 transition-all group"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <span className="text-sm font-medium">{account.displayName}</span>
                    {account.displayBalance && (
                      <span className="text-xs text-muted-foreground hidden md:inline">
                        ({account.displayBalance})
                      </span>
                    )}
                    <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
