import React, { Component, Fragment } from 'react'
import '../styles/customFooter.css'

class Footer extends Component{
    render(){
        return(
            <Fragment>
                <footer>
                    <nav>
                        <div className="join">
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" alt="The Movie Database (TMDb)" width="130" height="116"/>
                        </div>
                        <div>
                            <h4>The Best Movie Db Ever!</h4>
                        </div>
                        {/* <div>
                        <h3>The Basics</h3>
                        <ul>
                            <li><a href="/about">About TMDb</a></li>
                            <li><a href="/about/staying-in-touch">Contact Us</a></li>
                            <li><a href="/talk">Support Forums</a></li>
                            <li><a href="/documentation/api">API</a></li>
                            <li><a href="https://blog.themoviedb.org/" target="_blank" rel="noopener">Blog</a></li>
                        </ul>
                        </div>
                        <div>
                        <h3>Get Involved</h3>
                        <ul>
                            <li><a href="/bible"><span class="glyphicons glyphicons-asterisk"></span> Contribution Bible</a></li>
                            <li><a href="/apps">3rd Party Applications</a></li>
                            <li><a href="/movie/new">Add New Movie</a></li>
                            <li><a href="/tv/new">Add New TV Show</a></li>
                        </ul>
                        </div>
                        <div>
                        <h3>Community</h3>
                        <ul>
                            <li><a href="/documentation/community/guidelines">Guidelines</a></li>
                            <li><a href="/leaderboard">Leaderboard</a></li>
                            <li><a href="/discuss">Forums</a></li>
                            <li><a href="https://twitter.com/themoviedb" target="_blank" rel="noopener">Twitter</a></li>
                            <li><a href="https://www.facebook.com/themoviedb" target="_blank" rel="noopener">Facebook</a></li>
                        </ul>
                        </div>
                        <div>
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="/documentation/website/terms-of-use">Terms of Use</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                        </ul>
                        </div> */}
                    </nav>
                </footer>
            </Fragment>
        )
    }
}

export default Footer;