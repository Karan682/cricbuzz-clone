import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MatchDetails = () => {
    const params = useParams()
    const [match,setMatch] = useState ({})

    //initial details
    useEffect(() => {
        if(params?.slug) getMatch()
    }, [params?.slug])


    //get match
    const getMatch = async() =>{
        try{
            const {data} = await axios.get(`/api/v1/match/get-match/${params.slug}`)
            setMatch(data?.match)
        }catch(error){
            console.log(error);
        }
    }

    
  return (
    <Layout>
        <div className='row container mt-2'>
        <div className='col-md-6'>
            <img
            src={`/api/v1/match/match-photo/${match._id}`}
            className='card-img-top'
            alt={match.name}
            height={"300"}
            width={"350px"}
            />
        </div>
        <div className='col-md-6'>
            <h1 className='text-center'>{match.name} <h6>( {match.category?.name})</h6></h1>
            <h6>Venue : {match.venue}</h6>
            <h6>Toss_winner : {match.toss_winner}</h6>
            <h6>{match.team_1} : {match.team_1r}</h6>
            <h6> {match.team_2} : {match.team_2r}</h6>
            <h6>Winner : {match.winner}</h6>
            <h6> {match.description}</h6>
        </div>
        </div>
    </Layout>
  )
}

export default MatchDetails;