import logo from '../assets/logo.png';

function HomePage () {

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
        <div className="flex flex-row justify-center mb-20">
      <div>
            <img src={logo} alt="logo" className="max-w-64 max-h-64"/>
        </div>
        <div>
        <h1 className="text-9xl">HOPE </h1>
            <h2 className="text-3xl">Charity Crowdfunding Platform</h2>
        </div>
      </div>
        </section>
    )
}

export default HomePage;