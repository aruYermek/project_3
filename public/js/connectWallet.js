async function connectWallet() {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
              console.log('Wallet already connected:', accounts[0]);
              updateConnectButton(accounts[0]); // Обновляем содержимое кнопки
              return;
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          window.web3 = new Web3(window.ethereum);
          const currentAccount = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
          console.log('Connected to wallet:', currentAccount);
          updateConnectButton(currentAccount); // Обновляем содержимое кнопки
      } catch (error) {
          console.error(error);
      }
  } else {
      console.error('MetaMask not detected!');
  }
}

function updateConnectButton(account) {
  const button = document.getElementById('wallet-connect');
  button.textContent = `Connected: ${account}`;
  button.disabled = true; // Отключаем кнопку после подключения
}
