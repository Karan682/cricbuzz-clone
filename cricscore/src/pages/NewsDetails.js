import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const NewsDetails = () => {
    const params = useParams()
    const [news,setNews] = useState ({})

    //initial details
    useEffect(() => {
        if(params?.slug) getNews()
    }, [params?.slug])


    //get news
    const getNews = async() =>{
        try{
            const {data} = await axios.get(`/api/v1/news/get-news/${params.slug}`)
            setNews(data?.news)
        }catch(error){
            console.log(error);
        }
    }

    
  return (
    <Layout>
        <div className='row container mt-2'>
        <div className='col-md-6'>
            <img
            src={`/api/v1/news/news-photo/${news._id}`}
            className='card-img-top'
            alt={news.name}
            height={"300"}
            width={"350px"}
            />
        </div>
        <div className='col-md-6'>
            <h1 className='text-center'>{news.name}</h1>
            
            <h6>Description : {news.description}</h6>
                
        </div>
        </div>
    </Layout>
  )
}

export default NewsDetails;