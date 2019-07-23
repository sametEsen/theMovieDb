import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const constants = {
    baseImageUrl: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
}

class MovieTableRow extends Component{
    state = {
        movie: this.props.item
    }

    render(){
        return(
            <React.Fragment>
                <tbody>
                    <tr>
                        <td>
                            {this.state.movie.id}
                        </td>
                        <td>
                            <Image src={constants.baseImageUrl + this.state.movie.poster_path} height={100} />
                        </td>
                        <td>
                            {this.state.movie.original_title}
                        </td>
                        <td>
                            {this.state.movie.release_date}
                        </td>
                        <td>
                            <Link to={{
                                pathname: '/moviedetails',
                                state: {
                                    movieid: this.state.movie.id
                                }
                            }}>
                                Details
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </React.Fragment>
        )
    }
}

export default MovieTableRow