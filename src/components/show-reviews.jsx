import {useState, useEffect} from "react";
import { getReviews, getCategories } from "../utils/axiosData";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewCard from "./review-card";
import { useSearchParams } from 'react-router-dom';



export default function ShowReviews() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryQuery = searchParams.get('category')

    let boolean = false;

    if(categoryQuery !== undefined) {
        boolean = true; 
    }

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery)
    const [categories, setCategories] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(boolean)
    const [ categoryDescription, setCategoryDescription ] = useState("")
    const [error, setError] = useState(false)
    

    useEffect(() => {
        getReviews(selectedCategory).then(response => {
            setReviews(response.data.reviews)
            setIsLoading(false)
        }).catch((error) => {
            setError(true)
            setIsLoading(false)
        })
    },[searchParams])

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data.categories)
        })
    }, [])

    useEffect(() => {
        categories.map(category => {
            if(category.slug === selectedCategory) {
                setCategoryDescription(category.description)
            }
        })
    }, [searchParams, categories])

    if(error) {
        return (<p>reviews not found for chosen filters</p>)
    }

    const returnItem = isLoading ? (
    <div className="progress-container">
    <h2>Loading reviews...</h2>
    <CircularProgress size={150} />
    </div>
  ) : ( 
    <>
    <form onSubmit={(event)=>{
        event.preventDefault()
        const newParams = new URLSearchParams(searchParams);
        newParams.set("category", selectedCategory)
        setSearchParams(newParams)
        setIsLoading(true)
        setHasSubmitted(true)
        setCategoryDescription("")
    }}>
        <p>category: </p>
        <select id="category-selector" onChange={(event) => {
                setSelectedCategory(event.target.value)
        }}>
            {!hasSubmitted ? <option key="all" value={undefined}>all reviews</option> : <option key={selectedCategory} value={selectedCategory}>{selectedCategory}</option>}
            {categories.map(category => {
                return (
                    <option key={category.slug} value={category.slug}>{category.slug}</option>
                )
            })}
            {hasSubmitted ? <option key="all" value={undefined}>all reviews</option> : null}
        </select>
        <button type="submit">search</button>
    </form>
    <p>{categoryDescription}</p>
        <ol className="review-list">
            {
            reviews.map(review => {
                    return (
                                <ReviewCard review={review}
                                key={review.review_id}/>
                            )
                })
            }
        </ol>
    </>
    )
    return <>{returnItem}</>
}