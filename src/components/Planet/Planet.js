import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'
const axios = require('axios')
const ASTROBIN_KEY = process.env.REACT_APP_ASTROBIN_KEY
const ASTROBIN_SECRET = process.env.REACT_APP_ASTROBIN_SECRET
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Planet = (props) => {

    const [planetData, setPlanetData] = useState('')

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/planets/display/${props.planetId}`) // Returns info on the planet.
        .then(rdata => {
            // console.log(rdata.data.planet[0])
            setPlanetData(rdata.data.planet[0])
        })
    }, [planetData])

    let commentList
    
    if (planetData.comments) {
        commentList = planetData.comments.map((comment, i) => {
            return < Comment comment={comment} user={props.user} key={`comment-id-${i}`} />
        })
    } else {
        commentList = <p>No comments yet!</p>
    }

    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&count=5`)
    // .then(res => {
    //     console.log(res)
    // })
    
    // axios.get(`https://astrobin.com/api/v1/image/?subjects=M31&api_key=${ASTROBIN_KEY}&api_secret=${ASTROBIN_SECRET}&format=json`)
    // .then(res => {
    //     console.log('Axios response: ' + res)
    // })

    // Planet info is defined here, outside of the return statement, due to the fact
    // that the way the data is processed changes based on which planet we're looking at - planets with days longer than Earth's require a different formula from planets with days shorter than Earth's, for example

    let planetDayLength
    if (Math.abs(planetData.sideralRotation) > 23.93) {
        planetDayLength = <p>A single day on {planetData.name} is {Math.round(( Math.abs(planetData.sideralRotation) / 24 ))} days on Earth!</p>
    } else {
        planetDayLength = <p>{planetData.name} has {Math.round(( 24 / Math.abs(planetData.sideralRotation) ))} day(s) in a single Earth Day!</p>
    } 

    let planetTimeToOrbit
    if (Math.round(planetData.sideralOrbit) > 365.256) {
        planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit / 365.256)} years on Earth for {planetData.name} to orbit the sun</p>
    } else {
        planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit)} days on Earth for {planetData.name} to orbit the sun</p>
    }

    if (!planetData) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <div>
                <h2>{planetData.name}</h2>
    
                <h4>Info:</h4>
                {planetDayLength}

                {planetTimeToOrbit}

                <p>On {planetData.name} you would weigh {Math.round((props.user.weight / 9.8) * ( planetData.gravity))} pounds!</p>

                <p>On {planetData.name} you would be {Math.round((props.user.age * 364.25) / ( planetData.sideralOrbit))} years old!</p>
    
                <h4>Comments: </h4>
                {commentList}
    
                < Link to={`/comments/add/${planetData._id}`} ><button>Add To This Entry</button></Link>
            </div>
        );
    }
}

export default Planet;