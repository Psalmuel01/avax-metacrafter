import { useContext, useEffect, useState } from 'react';
import './App.css';
import WalletContext from './context/WalletContext';

function App() {
  const { account, connectWallet, contract } = useContext(WalletContext);
  const [secret, setSecret] = useState('');
  const [refetch, setRefetch] = useState(true);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    if (contract && refetch) {
      contract.showSecret().then((data) => {
        setSecret(data);
      });
    }
  }, [contract, refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const secretValue = e.target.secret.value;
    contract.setSecret(secretValue).then(() => setRefetch(true));
  };

  const showOwner = async () => {
    const ownerAddress = await contract?.showOwner();
    console.log(ownerAddress);
    setOwner(ownerAddress);
  };

  return (
    <>
      {account ? (
        <>
          <p>Current Secret: {secret}</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="secret">Enter secret</label>
              <input
                type="text"
                name="secret"
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>
            <button type="submit">Update secret</button>
          </form>

          <p>Owner Address: {owner}</p>

          <button onClick={showOwner}>Show Owner</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </>
  );
}

export default App;
