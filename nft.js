const ethereum = window.ethereum;

let onboarding;
let web3;
let chainId;
let account;

// スマート コントラクトのインタフェースを規定する ABI
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

// ページのロード完了時に、MetaMask の接続のための onboarding インスタンスを初期化し、UI をリセットする。
$(() => { onload(); updateButton(); });
// [MetaMask に接続] ボタンが押されたら、未インストールの状況ではインストールするように誘導し、既にインストールされていれば、ウォレットへの接続許可を求めます。
$("#connect").on("click", async () => { await connectWallet(); updateButton(); });
$("#disconnect").on("click", () => { disconnectWallet(); updateButton(); });
$("#query").on("click", queryOnClick);

// 画面 UI を、状況に応じて適切に設定します。
function updateButton() {
    if (!!account) {
        // すでにウォレットが接続された状況。
        $("#connect").hide();
        $("#disconnect").show();

        $("#network").text(chainId);
        $("#account").text(account);

        $("#query").prop('disabled', false);
    } else {
        // ウォレットが接続されていない状況。
        $("#connect").show();
        $("#connect").prop('disabled', false);
        $("#disconnect").hide();

        $("#network").text("");
        $("#account").text("");

        $("#query").prop('disabled', true);
    }
}

function onload() {
    onboarding = new MetaMaskOnboarding();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        ethereum.on('accountsChanged', newAccounts => {
            changeAccounts(newAccounts);
            updateButton();
        });
        ethereum.on('chainChanged', newChainId => {
            chainId = Web3.utils.hexToNumber(newChainId);
            updateButton();
        });
    }
}

async function connectWallet() {
    $("#connect").prop('disabled', true);

    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        onboarding.startOnboarding();
        return;
    }

    try {
        web3 = new Web3(ethereum);
        const accounts = await web3.eth.requestAccounts();
        chainId = await web3.eth.getChainId();
        changeAccounts(accounts);
    } catch {
        // 接続がキャンセルされた状態。
        disconnectWallet();
    } finally {
        $("#connect").prop('disabled', false);
    }
}

function changeAccounts(accounts) {
    if (!accounts || accounts.length == 0) {
        disconnectWallet();
    } else {
        account = accounts[0];
    }
}

function disconnectWallet() {
    web3 = null;
    account = null;
}

async function queryOnClick() {
    const contractAddress = `${$("#contractAddress").val()}`.trim();
    $("#queriedNft").text(contractAddress);

    let nftContractInstance;
    let numTokens;
    try {
        nftContractInstance = new web3.eth.Contract(abi, contractAddress);

        numTokens = parseInt(await nftContractInstance.methods.balanceOf(account).call());
        $("#nftCount").text(numTokens);

        $("#info").show();
        $("#queriedAddress").text(account);
        $("#error").hide();
    } catch (e) {
        $("#info").hide();
        $("#error").show();
        $("#errorMessage").text(e.message);
    }

    try {
        const tokensDiv = $(`<div class="row mt-3"></div>`);
        for (let i = 0; i < numTokens; i++) {
            const tokenId = parseInt(await nftContractInstance.methods.tokenOfOwnerByIndex(account, i.toString()).call());

            tokensDiv.append(`
                <div class="card mx-1 my-1" style="width: 190px;">
                    <div class="card-body">
                        トークン ID: ${tokenId}
                    </div>
                </div>`);
        }
        $("#tokens").empty().append(tokensDiv);
    } catch { }
}
