import BlockSection from './sections/BlockSection';
import ContractSection from './sections/ContractSection';
import WalletSection from './sections/WalletSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col px-[7%] md:px-[32%] py-8 bg-neutral-900 space-y-8 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl">Fuels React</h1>
        <p className="text-neutral-400">Highly experimental Fuel React library</p>
      </div>
      <WalletSection />
      <BlockSection />
      <ContractSection />
    </div>
  );
}

export default App;
