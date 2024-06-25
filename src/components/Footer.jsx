import {Link} from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";
function Footer () {

    return (
    <div className="">
        <footer className="bg-gray-50 dark:bg-gray-500 dark:text-white items-center mt-auto flex flex-col justify-center" >
            <div className='"flex flex-wrap  py-3 "'>
            <a href="https://github.com/SantosMatheusSilva/crowdfunding-app-client" className="flex items-center mr-4 gap-2">
                <VscGithub style={{width: "30px", height: "30px"}}/>
                <p>
                Check our code.
                </p>
            </a>
            </div>
        </footer>
     </div>
    )
}

export default Footer;