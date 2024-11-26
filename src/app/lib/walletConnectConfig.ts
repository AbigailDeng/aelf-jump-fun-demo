import { PortkeyDiscoverWallet } from '@aelf-web-login/wallet-adapter-portkey-discover';
import { PortkeyAAWallet } from '@aelf-web-login/wallet-adapter-portkey-aa';
import { NightElfWallet } from '@aelf-web-login/wallet-adapter-night-elf';
import { IConfigProps } from '@aelf-web-login/wallet-adapter-bridge';
import {
  TChainId,
  SignInDesignEnum,
  // NetworkEnum,
} from '@aelf-web-login/wallet-adapter-base';
import { PORTKEY_CONFIG } from '@/app/dice/config';

const APP_NAME = 'explorer.aelf.io';
const WEBSITE_ICON = 'https://explorer.aelf.io/favicon.main.ico';
const CHAIN_ID = 'AELF' as TChainId;
// const NETWORK_TYPE = NetworkEnum.TESTNET;
// const NETWORK_TYPE = NetworkEnum.MAINNET;
const RPC_SERVER_AELF = 'https://aelf-test-node.aelf.io';
const RPC_SERVER_TDVV = 'https://tdvv-public-node.aelf.io';
const RPC_SERVER_TDVW = 'https://tdvw-test-node.aelf.io';
// const GRAPHQL_SERVER =
//   'https://dapp-aa-portkey.portkey.finance/aefinder-v2/api/app/graphql/portkey';
// const CONNECT_SERVER = 'https://auth-aa-portkey.portkey.finance';
// const SERVICE_SERVER = 'https://aa-portkey.portkey.finance';
// const GRAPHQL_SERVER =
//   'https://dapp-aa-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql';
// const CONNECT_SERVER = 'https://auth-aa-portkey-test.portkey.finance';
// const SERVICE_SERVER = 'https://aa-portkey-test.portkey.finance';
const TELEGRAM_BOT_ID = 'xx';

const {
  NETWORK_TYPE,
  GRAPHQL_SERVER,
  CONNECT_SERVER,
  SERVICE_SERVER,
} = PORTKEY_CONFIG;

const didConfig = {
  graphQLUrl: GRAPHQL_SERVER,
  connectUrl: CONNECT_SERVER,
  serviceUrl: SERVICE_SERVER,
  requestDefaults: {
    baseURL: SERVICE_SERVER,
    timeout: 30000,
  },
  socialLogin: {
    Portkey: {
      websiteName: APP_NAME,
      websiteIcon: WEBSITE_ICON,
    },
    Telegram: {
      botId: TELEGRAM_BOT_ID,
    },
  },
  // customNetworkType: NETWORK_TYPE === 'TESTNET' ? 'offline' : 'online',
  // loginConfig: {
  //   loginMethodsOrder: [ "Email",  "Google" , "Apple" ,  "Scan"]
  // }
};

const baseConfig = {
  // ConfirmLogoutDialog: CustomizedConfirmLogoutDialog,
  // SignInComponent: SignInProxy,
  // defaultPin: '111111',
  // PortkeyProviderProps: {
  //   theme: 'light' as any,
  // },
  // omitTelegramScript: false,
  // cancelAutoLoginInTelegram: false,
  enableAcceleration: true,
  networkType: NETWORK_TYPE,
  chainId: CHAIN_ID,
  showVconsole: false,
  // chainId: CHAIN_ID,
  keyboard: true,
  noCommonBaseModal: false,
  design: SignInDesignEnum.CryptoDesign, // "SocialDesign" | "CryptoDesign" | "Web2Design"
  titleForSocialDesign: 'Crypto wallet',
  iconSrcForSocialDesign: 'url or base64',
};

const wallets = [
  new PortkeyAAWallet({
    appName: APP_NAME,
    chainId: CHAIN_ID,
    autoShowUnlock: true,
    noNeedForConfirm: false,
  }),
  new PortkeyDiscoverWallet({
    networkType: NETWORK_TYPE,
    chainId: CHAIN_ID,
    autoRequestAccount: true, // If set to true, please contact Portkey to add whitelist @Rachel
    autoLogoutOnDisconnected: true,
    autoLogoutOnNetworkMismatch: true,
    autoLogoutOnAccountMismatch: true,
    autoLogoutOnChainMismatch: true,
  }),
  new NightElfWallet({
    chainId: CHAIN_ID,
    appName: APP_NAME,
    connectEagerly: true,
    defaultRpcUrl: RPC_SERVER_AELF,
    nodes: {
      AELF: {
        chainId: 'AELF',
        rpcUrl: RPC_SERVER_AELF,
      },
      tDVW: {
        chainId: 'tDVW',
        rpcUrl: RPC_SERVER_TDVW,
      },
      tDVV: {
        chainId: 'tDVV',
        rpcUrl: RPC_SERVER_TDVV,
      },
    },
  }),
];

export const walletConnectConfig: IConfigProps = {
  didConfig,
  baseConfig,
  wallets,
};

// const config: IConfigProps = {
//   didConfig,
//   baseConfig,
//   wallets,
// };