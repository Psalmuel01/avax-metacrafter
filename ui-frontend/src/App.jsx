import { useContext, useEffect, useState } from 'react';
import './App.css';
import WalletContext from './context/WalletContext';

function App() {
  const { account, connectWallet, contract } = useContext(WalletContext);
  const [secret, setSecret] = useState('');
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    if (contract && refetch) {
      contract.showSecret().then((data) => {
        setSecret(data);
        setRefetch(false);
      });
    }
  }, [refetch, contract]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const secretValue = e.target.secret.value;
    e.target.secret.value = "";
    const set = await contract.setSecret(secretValue);
    await set.wait();
    setLoading(false);
    setRefetch(true);
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

          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
              <label htmlFor="secret">Enter secret:</label>
              <input
                type="text"
                name="secret"
                id="secret"
                style={{padding: "5px"}}
              />
            </div>
            <button type="submit">{loading ? "Updating" : "Update secret"}</button>
          </form>

          <div style={{display: "flex", flexDirection: "column"}}>
          <p style={{marginBottom: "0"}}>Owner Address: </p>
          <p>{owner}</p>
          </div>
          <button onClick={showOwner}>Show Owner</button>

        </>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </>
  );
}

export default App;
