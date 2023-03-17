import {useState, useEffect} from "react";
import { getReviews, getCategories } from "../utils/axiosData";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewCard from "./review-card";
import { useSearchParams } from 'react-router-dom';



export default function ShowReviews() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryQuery = searchParams.get('category')
    const sortByQuery = searchParams.get('sort_by')
    const orderByQuery = searchParams.get('order')

    let boolean = false;

    if(categoryQuery !== undefined && sortByQuery !== undefined) {
        boolean = true; 
    }

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery)
    const [categories, setCategories] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(boolean)
    const [error, setError] = useState(false)
    const [categoryDescription, setCategoryDescription] = useState("")
    const [selectedSortBy, setSelectedSortBy] = useState(sortByQuery)
    const [selectedOrderBy, setSelectedOrderBy] = useState(orderByQuery)
    const [hasSearched, setHasSearched] = useState(false)

    useEffect(() => {
        if(hasSearched) {
        getReviews(selectedCategory, selectedSortBy, selectedOrderBy).then(response => {
            setReviews(response.data.reviews)
            setIsLoading(false)
            hasSearched(false)
        }).catch((error) => {
            setError(true)
            setIsLoading(false)
            hasSearched(false)
        })
        }
    },[searchParams, selectedOrderBy, selectedSortBy, selectedCategory, hasSearched])

    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data.categories)
        })
    }, [])

    useEffect(() => {
        categories.map(category => {
            if(category.slug === selectedCategory && selectedCategory !== category.description) {
                setCategoryDescription(category.description)
            }
            return null;
        })
    }, [searchParams, categories, selectedCategory])


    if(error) {
        return (<p className="search-error">404: reviews not found</p>)
    }

   if(selectedOrderBy === "comment_count" && selectedSortBy === 'asc') {
        reviews.sort((a, b) => {
            return a.comment_count - b.comment_count
        })
   } else if (selectedOrderBy === "comment_count" && selectedSortBy === 'desc') {
        reviews.sort((a, b) => {
            return b.comment_count - a.comment_count
    })
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
        newParams.set("sort_by", selectedSortBy)
        newParams.set("order", selectedOrderBy)
        setSearchParams(newParams)
        setIsLoading(true)
        setHasSubmitted(true)
        setCategoryDescription("")
        setHasSearched(true)
    }} className="search-form">
        <select id="category-selector" onChange={(event) => {
                setSelectedCategory(event.target.value)
        }}>
            <option value={undefined} key="category">category</option>
            {categories.map(category => {
                return (
                    <option key={category.slug} value={category.slug}>{category.slug}</option>
                )
            })}
            {hasSubmitted ? <option key="all" value={undefined}>all reviews</option> : null}
        </select>
        <select id="sort-by-selector" onChange={(event) => {
                setSelectedSortBy(event.target.value)
        }}>
            <option key ="sort-by" value={undefined}>sort by</option>
            <option key="date" value={"created_at"}>date</option>
            <option key="votes" value={"votes"}>votes</option>
            <option key="comment-count" value={"comment_count"}>comment count</option>
        </select>
        <select id="order-by-selector" onChange={(event) => {
                setSelectedOrderBy(event.target.value)
        }}>
            <option key ="order-by" value={undefined}>order by</option>
            <option key="acs" value="asc">ascending</option>
            <option key="desc" value="desc">descending</option>
        </select>
        <button className="search-btn" type="submit">search</button>
    </form>
    {categoryDescription !== "" ? <p className="category-description">{categoryDescription}</p> : null}
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