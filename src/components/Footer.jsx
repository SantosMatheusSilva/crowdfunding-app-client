import {Link} from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";
function Footer () {

    return (
        <footer>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <a href="https://github.com/SantosMatheusSilva/crowdfunding-app-client">
                <VscGithub style={{width: "30px", height: "30px"}}/>
            </a>
            <p>
                Check our project
            </p>
            </div>
        </footer>
    )
}

export default Footer;