import {Link} from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";
function Footer () {

    return (
    <div className="">
        <footer className="bg-gray-50 dark:bg-gray-500 dark:text-white items-center mt-auto flex flex-col justify-center" >
            <div className='"flex justify-center  py-3 place-items-center"'>
            <a href="https://github.com/SantosMatheusSilva/crowdfunding-app-client">
                <VscGithub style={{width: "30px", height: "30px"}}/>
            </a>
            <p>
                Check our project
            </p>
            </div>
        </footer>
     </div>
    )
}

export default Footer;