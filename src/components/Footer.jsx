import {Link} from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";
function Footer () {

    return (
    <section className="flex flex-col min-h-screen">
        <footer className="bg-gray-50 dark:bg-gray-500 dark:text-white items-center mt-auto" >
            <div className='"flex justify-center items-center py-3 place-items-center"'>
            <a href="https://github.com/SantosMatheusSilva/crowdfunding-app-client">
                <VscGithub style={{width: "30px", height: "30px"}}/>
            </a>
            <p>
                Check our project
            </p>
            </div>
        </footer>
    </section>
    )
}

export default Footer;